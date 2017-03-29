var Roulette = function(imageElement, canvasElement, option) {
  var ctx;
  var image = imageElement;
  var canvas = canvasElement;
  var roulette = {
    time: 0.0, // ms
    angle: 0.0, // °
    velocity: 0.0, // °/ms
    spinning: false
  };
  var config = {
    step: 1000.0 / 60.0, // ms
    offset: 0.0, // °
    minVelocity: 0.0, // °
    maxVelocity: 1.0, // °/ms
    acceleration: 0.002, // °/ms^2
    deceleration: -0.001, // °/ms^2
    onRenderCallback: undefined,
    onStopCallback: undefined
  };
  if (option) {
    config.step = option.step||config.step;
    config.offset = option.offset||config.offset;
    config.minVelocity = option.minVelocity||config.minVelocity;
    config.maxVelocity = option.maxVelocity||config.maxVelocity;
    config.acceleration = option.acceleration||config.acceleration;
    config.deceleration = option.deceleration||config.deceleration;
    config.onRenderCallback = option.onRender||config.onRenderCallback;
    config.onStopCallback = option.onStop||config.onStopCallback;
  }

  var time = function() {
    return roulette.time;
  };
  var angle = function() {
    return roulette.angle;
  };
  var velocity = function() {
    return roulette.velocity;
  };
  var spinning = function() {
    return roulette.spinning;
  };

  var reset = function() {
    roulette.time = 0.0;
    roulette.angle = config.offset;
    roulette.velocity = config.minVelocity;
    roulette.spinning = false;
    render(roulette.angle);
  };

  var start = function() {
    if (roulette.spinning) {
      console.log("[Roulette] Already Started");
    } else {
      console.log("[Roulette] Start");
      roulette.spinning = true;
      startRoulette();
    }
  };

  var startRoulette = function () {
    if (!roulette.spinning) {
      stopRoulette();
    } else {
      render(roulette.angle);

      roulette.angle += roulette.velocity * config.step;
      roulette.velocity += config.acceleration * config.step;
      if (roulette.velocity >= config.maxVelocity) roulette.velocity = config.maxVelocity;

      setTimeout(function() {
        roulette.time += config.step;
        startRoulette();
      }, config.step);
    }
  };

  var bounded = function(angle) {
    var newAngle = angle % 360;
    if (newAngle < 0) newAngle += 360;
    return newAngle;
  };

  var stop = function(targetAngle) {
    if (!roulette.spinning) {
      console.log("[Roulette] Already Stopped");
    } else if (targetAngle) {
      if (config.deceleration >= 0) {
        console.log("[Roulette] Unexpected deceleration value : " + config.deceleration);
        config.deceleration = -0.001;
        roulette.spinning = false;
      } else {
        console.log("[Roulette] Stop at " + targetAngle);

        var diffVelocity = config.minVelocity - roulette.velocity;
        var plusVelocity = config.minVelocity + roulette.velocity;
        var originAngle, changeAngle, futureAngle, adjustAngle;

        originAngle = bounded(roulette.angle);
        changeAngle = (diffVelocity / (2 * config.deceleration)) * (plusVelocity - config.deceleration * config.step);
        futureAngle = originAngle + changeAngle;
        adjustAngle = bounded(targetAngle - futureAngle);
        futureAngle += adjustAngle;
        changeAngle = futureAngle - originAngle;

        config.deceleration = diffVelocity * plusVelocity / (2 * changeAngle + config.step * diffVelocity);
        roulette.spinning = false;
      }
    } else {
      console.log("[Roulette] Stop");
      roulette.spinning = false;
    }
  };

  var stopRoulette = function() {
    if (roulette.velocity <= config.minVelocity) {
      roulette.velocity = config.minVelocity;
      if (config.onStopCallback) config.onStopCallback({
        time: roulette.time,
        angle: roulette.angle,
        velocity: roulette.velocity,
        spinning: roulette.spinning,
        step: config.step
      });
    } else {
      render(roulette.angle);

      roulette.angle += roulette.velocity * config.step;
      roulette.velocity += config.deceleration * config.step;
      if (roulette.velocity <= config.minVelocity) roulette.velocity = config.minVelocity;

      setTimeout(function() {
        roulette.time += config.step;
        stopRoulette();
      }, config.step);
    }

    /* Initial Render */
    render(roulette.angle);
  };

  var render = function(degrees) {
    if (config.onRenderCallback) config.onRenderCallback({
      time: roulette.time,
      angle: roulette.angle,
      velocity: roulette.velocity,
      spinning: roulette.spinning,
      step: config.step
    });
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(degrees * Math.PI / 180);
      ctx.drawImage(image, 0, 0, image.width, image.height, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
      ctx.restore();
    }
  };

  render(roulette.angle);

  return {
    time: time,
    angle: angle,
    velocity: velocity,
    spinning: spinning,
    reset: reset,
    start: start,
    stop: stop
  }
};

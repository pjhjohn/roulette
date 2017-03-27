var Roulette = function(imageElement, canvasElement, option) {
  var ctx;
  var image = imageElement;
  var canvas = canvasElement;
  var config = {
    step: 30, // ms
    maxVelocity: 30.0, // degrees/step
    spinAcceleration: 1.5, // degrees/step/step
    spinDeceleration:-1.0, // degrees/step/step
  };
  var roulette = {
    angle: 0, // degrees
    velocity: 0, // degrees/step
    elapsedTime: 0, // ms
    spinning: false,
    onRenderCallback: undefined,
    onStopCallback: undefined
  };
  if (option) {
    config.step = option.step||config.step;
    config.maxVelocity = option.maxVelocity||config.maxVelocity;
    config.spinAcceleration = option.spinAcceleration||config.spinAcceleration;
    config.spinDeceleration = option.spinDeceleration||config.spinDeceleration;
    roulette.onRenderCallback = option.onRender||roulette.onRenderCallback;
    roulette.onStopCallback = option.onStop||roulette.onStopCallback;
  }

  var angle = function() {
    return roulette.angle;
  };
  var velocity = function() {
    return roulette.velocity;
  };
  var elapsedTime = function() {
    return roulette.elapsedTime;
  };
  var spinning = function() {
    return roulette.spinning;
  };

  var start = function() {
    if (roulette.spinning) {
      console.log("[Roulette] Already Started");
    } else {
      console.log("[Roulette] Start");
      roulette.elapsedTime = 0;
      roulette.spinning = true;
      startRoulette();
    }
  };

  var stop = function() {
    if (!roulette.spinning) {
      console.log("[Roulette] Already Stopped");
    } else {
      console.log("[Roulette] Stop");
      roulette.spinning = false;
    }
  };

  var startRoulette = function () {
    if (!roulette.spinning) {
      stopRoulette();
    } else {
      roulette.angle += roulette.velocity;
      roulette.velocity += config.spinAcceleration;
      if (roulette.velocity > config.maxVelocity) roulette.velocity = config.maxVelocity;
      render(roulette.angle);
      setTimeout(function() {
        roulette.elapsedTime += config.step;
        startRoulette();
      }, config.step);
    }
  };

  var stopRoulette = function() {
    if (roulette.velocity < 0) {
      roulette.velocity = 0;
      if (roulette.onStopCallback) roulette.onStopCallback({
        angle: roulette.angle,
        velocity: roulette.velocity,
        elapsedTime: roulette.elapsedTime,
        spinning: roulette.spinning,
        step: config.step
      });
    } else {
      roulette.angle += roulette.velocity;
      roulette.velocity += config.spinDeceleration;
      render(roulette.angle);
      setTimeout(function() {
        roulette.elapsedTime += config.step;
        stopRoulette();
      }, config.step);
    }

    /* Initial Render */
    render(roulette.angle);
  };

  var render = function(degrees) {
    if (roulette.onRenderCallback) roulette.onRenderCallback({
      angle: roulette.angle,
      velocity: roulette.velocity,
      elapsedTime: roulette.elapsedTime,
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
    angle: angle,
    velocity: velocity,
    elapsedTime: elapsedTime,
    spinning: spinning,
    start: start,
    stop: stop
  }
};

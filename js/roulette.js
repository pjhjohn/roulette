var Roulette = function(imageElement, canvasElement, renderCallback, stopCallback, config) {
  var ctx;
  var image = imageElement;
  var canvas = canvasElement;
  var renderCallback = renderCallback;
  var stopCallback = stopCallback;
  var option = {
    stepSize: 30, // ms
    maxVelocity: 30.0, // degrees/step
    spinAcceleration: 1.5, // degrees/step/step
    easeOutAcceleration: -1.0, // degrees/step/step
    requestTimeOut: 3000, // ms
  }
  if (config) {
    option.stepSize = config.stepSize||option.stepSize;
    option.maxVelocity = config.maxVelocity||option.maxVelocity;
    option.spinAcceleration = config.spinAcceleration||option.spinAcceleration;
    option.easeOutAcceleration = config.easeOutAcceleration||option.easeOutAcceleration;
    option.requestTimeOut = config.requestTimeOut||option.requestTimeOut;
  }
  var roulette = {
    angle: 0, // degrees
    velocity: 0, // degrees/step
    elapsedTime: 0, // ms
    spinning: false
  }

  var angle = function() {
    return roulette.angle;
  }
  var velocity = function() {
    return roulette.velocity;
  }
  var elapsedTime = function() {
    return roulette.elapsedTime;
  }
  var spinning = function() {
    return roulette.spinning;
  }

  var start = function() {
    if (roulette.spinning) {
      console.log("Roulette Already Started");
    } else {
      console.log("Start Roulette");
      roulette.elapsedTime = 0;
      roulette.spinning = true;
      startRoulette();
    }
  }

  var stop = function() {
    if (!roulette.spinning) {
      console.log("Roulette Already Stopped");
    } else {
      console.log("Stop Roulette");
      roulette.spinning = false;
    }
  }

  var startRoulette = function () {
    if (!roulette.spinning) {
      stopRoulette();
    } else {
      roulette.angle += roulette.velocity;
      roulette.velocity += option.spinAcceleration;
      if (roulette.velocity > option.maxVelocity) roulette.velocity = option.maxVelocity;
      render(roulette.angle);
      setTimeout(function() {
        roulette.elapsedTime += option.stepSize;
        startRoulette();
      }, option.stepSize);
    }
  }

  var stopRoulette = function() {
    if (roulette.velocity < 0) {
      roulette.velocity = 0;
      if (stopCallback) stopCallback({
        angle: roulette.angle,
        velocity: roulette.velocity,
        elapsedTime: roulette.elapsedTime,
        spinning: roulette.spinning,
        stepSize: option.stepSize,
      });
    } else {
      roulette.angle += roulette.velocity;
      roulette.velocity += option.easeOutAcceleration;
      render(roulette.angle);
      setTimeout(function() {
        roulette.elapsedTime += option.stepSize;
        stopRoulette();
      }, option.stepSize);
    }

    /* Initial Render */
    render(roulette.angle);
  }

  var render = function(degrees) {
    if (renderCallback) renderCallback({
      angle: roulette.angle,
      velocity: roulette.velocity,
      elapsedTime: roulette.elapsedTime,
      spinning: roulette.spinning,
      stepSize: option.stepSize,
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
  }

  render(roulette.angle);

  return {
    angle: angle,
    velocity: velocity,
    elapsedTime: elapsedTime,
    spinning: spinning,
    start: start,
    stop: stop,
  }
};

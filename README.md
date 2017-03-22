# roulette

Minimally Controlled Roulette Wheel with Animation

### Getting Started

Start with Simply passing `<canvas>` and `<img>` HTML element into `Roulette` constructor

```javascript
var roulette = Roulette(imageElement, canvasElement);
roulette.start();
roulette.stop();
```

### Available Methods

List of Available Methods

```javascript
roulette.angle()        // Get Roulette Angle
roulette.velocity()     // Get Roulette Angular Velocity
roulette.elapsedTime()  // Get Roulette Elapsed Time
roulette.spinning()     // Get Roulette Spinning Status
roulette.start()        // Start Roulette
roulette.stop()         // Stop Roulette
```

### Callbacks

##### Render Callback

Stop Callback is called every time the roulette re-rendered

```javascript
var roulette = Roulette(imageElement, canvasElement, function(data) {
  console.log("Rendering Roulette with Angle : " + data.angle)
});
```

##### Stop Callback

Stop Callback is called after the roulette has been completely stopped

```javascript
var roulette = Roulette(imageElement, canvasElement, null, function(data) {
  console.log("Final Roulette Angle : " + data.angle)
});
```

### Data Object

Data Object is passed to `RenderCallback` and `StopCallback` input parameter

```javascript
{
  angle: roulette.angle,
  velocity: roulette.velocity,
  elapsedTime: roulette.elapsedTime,
  spinning: roulette.spinning,
  stepSize: option.stepSize,
}
```

### Contribution

`sample/roulette.png` is made by [Freepik](http://www.freepik.com) from [Flaticon](http://www.flaticon.com) is licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/)

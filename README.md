# roulette

Minimally Controlled Roulette Wheel with Animation

### Getting Started

Simply pass `<canvas>` and `<img>` HTML elements into `Roulette` constructor

```javascript
var roulette = Roulette(imageElement, canvasElement);
roulette.start();
roulette.stop();
```

### Available Methods

List of Available Methods

```javascript
roulette.time()     // Get Roulette Elapsed Time
roulette.angle()    // Get Roulette Angle
roulette.velocity() // Get Roulette Angular Velocity
roulette.spinning() // Get Roulette Spinning Status
roulette.reset()    // Reset Roulette to Initial State
roulette.start()    // Start Roulette
roulette.stop()     // Stop Roulette
```

### Option Object

You can pass option object for additional roulette control.
JSON object below has default options:

```javascript
{
  step: 1000.0 / 60.0, // step length in ms
  offset: 0.0,         // roulette offset degrees
  minVelocity: 0.0,    // roulette minimum angular velocity
  maxVelocity: 1.0,    // roulette maximum angular velocity
  acceleration: 0.002, // roulette angular acceleration
  deceleration:-0.001, // roulette angular deceleration
  onRender: undefined, // roulette callback for render
  onStop: undefined    // roulette callback for stop
}
```

### Callbacks

##### Render Callback

Render Callback is called whenever roulette renders

```javascript
var roulette = Roulette(imageElement, canvasElement, {
  onRender: function(data) {
    console.log("Rendering Roulette with Angle : " + data.angle);
  }
});
```

##### Stop Callback

Stop Callback is called when roulette stopped spinning

```javascript
var roulette = Roulette(imageElement, canvasElement, {
  onStop: function(data) {
    console.log("Final Roulette Angle : " + data.angle);
  }
});
```

#### Data Object

Data Object is passed to roulette callbacks as an input parameter:

```javascript
{
  time: number,      // roulette.time()
  angle: number,     // roulette.angle(),
  velocity: number,  // roulette.velocity(),
  spinning: boolean, // roulette.spinning(),
  step: number       // roulette step length in ms
}
```

### Contribution

`sample/roulette.png` is made by [Freepik](http://www.freepik.com) from [Flaticon](http://www.flaticon.com) is licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/)

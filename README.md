# @okcid/lissajous-loader
> A loader for your site that draws [Lissajous curves](https://en.wikipedia.org/wiki/Lissajous_curve)

![demo.png](./docs_assets/demo.png)

## Installation
```shell
npm i @okcid/lissajous-loader
```

## Example
HTML:
```html
<html>
    <head>
    </head>
    <body>
        <canvas id="loader" width="50" height="50" />
    </body>
</html>
```
Javascript:
```javascript
import LissajousLoader from 'lissajous-loader';

const canvas = document.getElementById('loader');

const loader = new LissajousLoader(canvas, {
    xFrequency: 3,
    yFrequency: 2,
    delta: Math.PI / 2,
});
loader.start();

callApi()
    .then(() => {
        loader.stop();
    });
```

## API

### constructor
```javascript
const loader = new LissajousLoader(canvas, props);
```
* `canvas` &ndash; instance of `HTMLCanvasElement` to draw the loader on;  
    _Note:_ canvas is recommended to be square (`height` property should equal the `width` property)
* `props` &ndash; an object with loader props

    $x = A\ \sin(\alpha + \delta);$  
    $y = B\ \sin(\beta)$
  
    _Note:_ **A** and **B** are both equal to 1 for simplicity  
    _Note:_ ❗ means required prop, ❓ &ndash; optional prop
    
    | | Name | Type | Default | Description |
    | ---- | ---- | ---- | ---- | ---- |
    ❗ | `xFrequency`    | number |          | $\alpha$
    ❗ | `yFrequency`    | number |          | $\beta$
    ❗ | `delta`         | number |          | $\delta$, it is better to be a fraction of Pi (e.g. Pi/2, Pi/6, etc)
    ❓ | `step`          | number | 0.05     | A step for **t** param &ndash; the less it is, the more accurate the curve is
    ❓ | `padding`       | number | 16       | Padding inside canvas element
    ❓ | `colour`        | string | 000000   | HEX code of lines colour
    ❓ | `lineWidth`     | number | 1        | The width of the curve's line
    ❓ | `pause`         | number | 1000     | The time to wait before erasing the curve

### start
```
loader.start();
```
This method starts the drawing cycle of a loader

### stop
```
loader.stop();
```
Stops the drawing cycle of a loader and clears the canvas

### clear
```
loader.clear();
```
An utility method to clear the canvas 

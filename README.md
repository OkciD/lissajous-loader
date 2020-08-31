# @okcid/lissajous-loader
> A loader for your site that draws [Lissajous curves](https://en.wikipedia.org/wiki/Lissajous_curve)

![lissajous-loader-demo](__tests__/__snapshots__/LissajousLoader.test.ts.snap.LissajousLoader-should-clear-the-canvas-before-start.canvas-image.png)

## Installation
1. [Authenticate to GitHub Packages](https://docs.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages)
2. Create file `.npmrc` in your repository and add the following:
    ```
    @okcid:registry=https://npm.pkg.github.com
    ```
3. `npm i @okcid/lissajous-loader`

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
new LissajousLoader(canvas, props);
```
* `canvas` &ndash; instance of `HTMLCanvasElement` to draw the loader on;  
    _Note:_ canvas is recommended to be square (`height` property should equal the `width` property)
* `props` &ndash; an object with loader props  
    <img src="https://latex.codecogs.com/gif.latex?\inline&space;\begin{equation*}&space;\begin{cases}&space;x&space;=&space;A&space;\sin(\alpha&space;t&space;&plus;&space;\delta);&space;\\&space;y&space;=&space;B&space;\sin(\beta&space;t)&space;\end{cases}&space;\end{equation*}" title="\begin{equation*} \begin{cases} x = A \sin(\alpha t + \delta); \\ y = B \sin(\beta t) \end{cases} \end{equation*}" />
    * `xFrequency` &ndash; <img src="https://latex.codecogs.com/gif.latex?\inline&space;\alpha" title="\alpha" />
    * `yFrequency` &ndash; <img src="https://latex.codecogs.com/gif.latex?\inline&space;\beta" title="\beta" />
    * `delta` &ndash; <img src="https://latex.codecogs.com/gif.latex?\inline&space;\delta" title="\delta" />

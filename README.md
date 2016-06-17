# react-progress-bar

[React](https://facebook.github.io/react/) Component to render a [React Bootstrap](https://react-bootstrap.github.io/) progress bar (wrapped in a panel)

```
var ProgressBar = require('react-progress-bar');
ReactDOM.render(<ProgressBar />, document.getElementById('container'));
```

## Options

- __now__ - The currently loaded percentage you want to diplay. Default: 100.
- __duration__ The duration of the transition to the loaded percentage. - Default: 1.
- __title__ A title on the loading panel. - Default: null.
- __subtitle__ A subtitle on the loading panel. - Default: null.
- __type__ The type of loading bar (one of success', 'info', 'warning', 'danger') - Default: 'info'.

## Demo

Run `npm run start` then open `doc/example.html` in a browser to see it working

## Developing

Clone the repo and `npm install`.

`npm start` will create and watchify an example which you can open in your browser, at `doc/example.html`

`npm test` for the unit tests.

`npm run coverage` gets coverage with istanbul, report is output to the `coverage` directory. It will exit nonzero if any metric is below 100%

`npm run lint` checks the code against our [guidelines](https://github.com/holidayextras/culture/blob/master/.eslintrc)

# react-progress-bar

[React](https://facebook.github.io/react/) Component to render a [React Bootstrap](https://react-bootstrap.github.io/) progress bar in the HX Style (wrapped in a panel)

```
var ProgressBar = require('react-progress-bar');
React.render(<ProgressBar />, document.getElementById('container'));
```

## Options

- __now__ - The currently loaded percent as an integer. Default `100`.
- __title__ - The title for the panel. Default `null`.


## Demo

Run `npm run start` then open `doc/example.html` in a browser to see it working

## Developing

Clone the repo and `npm install`.

`npm start` will create and watchify an example which you can open in your browser, at `doc/example.html`

`npm test` for the unit tests.

`npm run lint` checks the code against our [guidelines](https://github.com/holidayextras/culture/blob/master/.eslintrc)

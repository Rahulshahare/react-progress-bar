'use strict';

var React = require('react');
var ProgressBar = require('../src/ProgressBar.jsx');

var Example = React.createClass({

  getInitialState: function() {
    return {
      loadedTime: 0
    };
  },

  updateTime: function() {
    this.setState({ loadedTime: this.state.loadedTime + 10 });
  },

  render: function() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Progress Bar</h1>
        </div>

        <h2>Without external control of loading</h2>
        <h3>Defaults to 100% loaded</h3>
        <ProgressBar />

        <h3>Transitions to 50% loaded over 5 seconds</h3>
        <ProgressBar duration={5} now={50} />

        <h3>Transitions to 100% loaded over 30 seconds</h3>
        <ProgressBar duration={30} />

        <h2>With an external control</h2>
        <h3>Updates based on a percent (as integer) you pass in</h3>
        <p>default transition</p>
        <ProgressBar now={this.state.loadedTime} />

        <p>5 second transition</p>
        <ProgressBar now={this.state.loadedTime} duration={5} />
        <button className="btn btn-default" onClick={this.updateTime}>Load 10% more</button>
      </div>
    );
  }
});

React.render(<Example />, document.getElementById('container'));

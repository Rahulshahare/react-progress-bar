'use strict';

var React = require('react');
var ProgressBar = require('../src/ProgressBar.jsx');

var Example = React.createClass({

  getInitialState: function() {
    return {
      loadedTime: 20
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

        <h2>With a loadTime</h2>
        <h3>Updates automatically over period of time passed in as prop</h3>
        
        <p>10 seconds</p>
        <ProgressBar loadTime={10} />

        <p>20 seconds</p>
        <ProgressBar loadTime={20} />

        <p>20 seconds (with lower interval making it smoother)</p>
        <ProgressBar loadTime={20} interval={100} />

        <h2>With an external control</h2>
        <h3>Updates based on a percent (as integer) you pass in (currently 20%)</h3>
        <ProgressBar now={this.state.loadedTime} />
        <button className="btn btn-default" onClick={this.updateTime}>Load 10% more</button>

        <h2>Without external control of loading</h2>
        <h3>Defaults to 0% loaded</h3>
        <ProgressBar />

        <h2>With some text</h2>
        <ProgressBar subtitle="This is a subtitle" title="This is a title">This is a child</ProgressBar>
        
      </div>
    );
  }
});

React.render(<Example />, document.getElementById('container'));

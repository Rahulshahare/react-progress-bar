'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var ProgressBar = React.createClass({

  propTypes: {
    now: React.PropTypes.number,
    title: React.PropTypes.string,
    type: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    children: React.PropTypes.node,
    loadTime: React.PropTypes.number,
    interval: React.PropTypes.number
  },

  getInitialState: function() {
    return {
      now: this.props.now
    }
  },

  getDefaultProps: function() {
    return {
      now: 0,
      title: null,
      type: 'info',
      loadTime: null,
      interval: 500
    };
  },

  clearTimer: function() {
    if(this.timer) {
      clearInterval(this.timer);
    }
  },

  componentDidMount: function() {
    if(this.props.loadTime) {
      var step = (100 / this.props.loadTime) / (1000 / this.props.interval);
      var self = this;
      this.timer = setInterval(function() {
        self.setState({now: self.state.now + step});
        if(self.state.now >= 100) self.clearTimer();
      }, this.props.interval);
    }
  },

  componentDidUnmount: function() {
    this.clearTimer();
  },

  componentWillReceiveProps: function(nextProps) {

    // TODO: Why do we get this update all the other components?
    // debugger;

    if(nextProps.now !== this.state.now) {
      this.setState({now: nextProps.now});
    }
  },

  render: function() {
    return (
      <ReactBootstrap.Panel header={this.props.title} bsStyle={this.props.type}>
        <ReactBootstrap.ProgressBar active striped bsStyle={this.props.type} now={this.state.now} ref="progressBar" />
        {this.props.children}
      </ReactBootstrap.Panel>
    );
  }
});

module.exports = ProgressBar;

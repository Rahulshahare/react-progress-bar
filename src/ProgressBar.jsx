'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var ProgressBar = React.createClass({

  propTypes: {
    now: React.PropTypes.number,
    title: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      now: 100,
      title: null
    };
  },

  render: function() {
    return (
      <ReactBootstrap.Panel header={this.props.title} bsStyle="success">
        <ReactBootstrap.ProgressBar active striped bsStyle="success" now={this.props.now} />
      </ReactBootstrap.Panel>
    );
  }
});

module.exports = ProgressBar;

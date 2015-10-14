'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var ProgressBar = React.createClass({

  propTypes: {
    now: React.PropTypes.number,
    title: React.PropTypes.string,
    type: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    children: React.PropTypes.node
  },

  getDefaultProps: function() {
    return {
      now: 100,
      title: null,
      type: 'info'
    };
  },

  render: function() {
    return (
      <ReactBootstrap.Panel header={this.props.title} bsStyle={this.props.type}>
        <ReactBootstrap.ProgressBar active striped bsStyle={this.props.type} now={this.props.now} />
        {this.props.children}
      </ReactBootstrap.Panel>
    );
  }
});

module.exports = ProgressBar;

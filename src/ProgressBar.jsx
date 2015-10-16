'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var ProgressBar = React.createClass({

  propTypes: {
    now: React.PropTypes.number,
    duration: React.PropTypes.number,
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    type: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    children: React.PropTypes.node
  },

  getDefaultProps: function() {
    return {
      now: 100,
      duration: 1,
      title: null,
      subtitle: null,
      type: 'info'
    };
  },

  getInitialState: function() {
    return {
      loaded: 0
    };
  },

  componentDidMount: function() {
    var self = this;
    setTimeout(function() {
      self.setState({ loaded: self.props.now });
    }, 500);
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.now !== this.props.now) {
      this.setState({ loaded: nextProps.now });
    }
  },

  render: function() {
    var timing = this.props.duration + 's';
    var subtitle = this.props.subtitle ? <p>{this.props.subtitle}</p> : undefined;

    // TODO: We need a better way of handling the CSS transitions here.
    var uniqueClass = 'progressBar' + timing;
    var style = '.' + uniqueClass + ' {transition-duration: ' + timing + '; }';

    return (
      <ReactBootstrap.Panel header={this.props.title} bsStyle={this.props.type}>
        <style>{style}</style>
        {subtitle}
        <ReactBootstrap.ProgressBar className={uniqueClass} active striped bsStyle={this.props.type} now={this.state.loaded} />
        {this.props.children}
      </ReactBootstrap.Panel>
    );
  }
});

module.exports = ProgressBar;

'use strict'

const React = require('react')
const ReactBootstrap = {
  Panel: require('react-bootstrap/lib/Panel'),
  ProgressBar: require('react-bootstrap/lib/ProgressBar')
}

const ProgressBar = React.createClass({

  propTypes: {
    start: React.PropTypes.number,
    now: React.PropTypes.number,
    duration: React.PropTypes.number,
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    type: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    children: React.PropTypes.node
  },

  getDefaultProps: function () {
    return {
      start: 0,
      now: 100,
      duration: 1,
      title: null,
      subtitle: null,
      type: 'info'
    }
  },

  getInitialState: function () {
    return {
      loaded: this.props.start
    }
  },

  componentDidMount: function () {
    const self = this
    this._timeoutId = setTimeout(function () {
      try {
        // We can only setState if we want our component to re-render
        // and we only want to re-render if we have a DOM Node to render into.
        if (self.isMounted()) {
          self.setState({ loaded: self.props.now })
        }
      } catch (e) {
        // Because our isMounted method throws if DOM has mutated, take advantage here
        // and clear the timeout when we've hit this problem.
        clearTimeout(self._timeoutId)
      }
    }, 500)
  },

  componentWillUnmount: function () {
    clearTimeout(this._timeoutId)
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.now !== this.props.now) {
      this.setState({ loaded: nextProps.now })
    }
  },

  render: function () {
    const timing = this.props.duration + 's'
    const subtitle = this.props.subtitle ? <p>{this.props.subtitle}</p> : undefined

    // TODO: We need a better way of handling the CSS transitions here.
    const uniqueClass = 'progressBar' + timing
    const style = '.' + uniqueClass + ' {transition-duration: ' + timing + '; }'

    return (
      <ReactBootstrap.Panel header={this.props.title} bsStyle={this.props.type}>
        <style>{style}</style>
        {subtitle}
        <ReactBootstrap.ProgressBar className={uniqueClass} active striped bsStyle={this.props.type} now={this.state.loaded} />
        {this.props.children}
      </ReactBootstrap.Panel>
    )
  }
})

module.exports = ProgressBar

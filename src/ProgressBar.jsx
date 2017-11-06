'use strict'

const React = require('react')
const ReactBootstrap = {
  Panel: require('react-bootstrap/lib/Panel'),
  ProgressBar: require('react-bootstrap/lib/ProgressBar')
}
const { number, string, oneOf, node } = require('prop-types')

class ProgressBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: props.start
    }
  }

  componentDidMount () {
    this._isMounted = true
    this._timeoutId = setTimeout(() => this._isMounted && this.setState({ loaded: this.props.now }), 500)
  }

  componentWillUnmount () {
    clearTimeout(this._timeoutId)
    this._isMounted = false
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.now !== this.props.now) {
      this.setState({ loaded: nextProps.now })
    }
  }

  render () {
    const { duration, subtitle, type, title, children } = this.props
    const { loaded } = this.state

    // TODO: We need a better way of handling the CSS transitions here.
    const timing = duration + 's'
    const uniqueClass = 'progressBar' + timing
    const style = '.' + uniqueClass + ' .progress-bar {transition-duration: ' + timing + ';}'

    return (
      <ReactBootstrap.Panel header={title} bsStyle={type}>
        <style>{style}</style>
        {subtitle && <p>{subtitle}</p>}
        <ReactBootstrap.ProgressBar
          active
          striped
          className={uniqueClass}
          bsStyle={type}
          now={loaded}
        />
        {children}
      </ReactBootstrap.Panel>
    )
  }
}

ProgressBar.propTypes = {
  start: number,
  now: number,
  duration: number,
  title: string,
  subtitle: string,
  type: oneOf(['success', 'info', 'warning', 'danger']),
  children: node
}

ProgressBar.defaultProps = {
  start: 0,
  now: 100,
  duration: 1,
  title: null,
  subtitle: null,
  type: 'success'
}

module.exports = ProgressBar

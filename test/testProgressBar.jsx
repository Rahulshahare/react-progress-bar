'use strict'

require('react-tests-globals-setup')
const React = require('react')
const { ProgressBar: ReactProgressBar, Panel } = require('react-bootstrap')
const { shallow, mount } = require('enzyme')

const assert = require('assert')
const sinon = require('sinon')

const ProgressBar = require('../src/ProgressBar')

const defaultProps = {
  start: 0,
  now: 100,
  duration: 1,
  title: null,
  subtitle: null,
  type: 'success'
}

describe('ProgressBar', function () {
  it('has default values for many props', function () {
    const wrapper = shallow(<ProgressBar />)
    assert.deepEqual(wrapper.instance().props, defaultProps)
  })

  context('with no properties', function () {
    var wrapper

    before(function () {
      wrapper = shallow(<ProgressBar />)
    })

    it('returns a react-bootstrap panel', function () {
      assert.equal(wrapper.type(), Panel)
    })

    it('should count 2 children', function () {
      assert.equal(wrapper.children().length, 2)
    })

    context('1st child', function () {
      it('should be a style tag', function () {
        assert.equal(wrapper.childAt(0).type(), 'style')
      })
    })

    context('2nd child', function () {
      it('should be a ReactBootstrap ProgressBar', function () {
        assert.equal(wrapper.childAt(1).type(), ReactProgressBar)
      })

      it('should have the same bsStyle prop as the parent', function () {
        assert.equal(wrapper.prop('bsStyle'), wrapper.childAt(1).prop('bsStyle'))
      })
    })
  })

  context('with a title', function () {
    it('should have the title set on the panel', function () {
      const title = 'This is a title'
      const wrapper = shallow(<ProgressBar title={title} />)
      assert.equal(wrapper.prop('header'), title)
    })
  })

  context('with a subtitle', function () {
    let wrapper
    const subtitle = 'This is a subtitle'

    before(function () {
      wrapper = shallow(<ProgressBar subtitle={subtitle} />)
    })

    it('should have a 2nd child that is a paragraph', function () {
      assert.equal(wrapper.childAt(1).type(), 'p')
    })

    it('should have the correct text', function () {
      assert.equal(wrapper.childAt(1).text(), subtitle)
    })
  })

  context('with a start point', function () {
    let wrapper

    before(function () {
      wrapper = shallow(<ProgressBar start={50} />)
    })

    it('should render a progress bar at 50%', function () {
      assert.equal(wrapper.childAt(1).prop('now'), 50)
    })
  })

  context('render into document', function () {
    let wrapper, clock

    beforeEach(function () {
      clock = sinon.useFakeTimers()
      class Container extends React.Component {
        constructor (props) {
          super(props)
          this.state = { testState: props.now }
        }

        render () {
          return <ProgressBar start={10} now={this.state.testState} />
        }
      }
      wrapper = mount(<Container now={75} />)
    })

    afterEach(function () {
      clock.restore()
    })

    it('should start at 10', function () {
      assert.equal(wrapper.find(ReactProgressBar).at(0).prop('now'), 10)
    })

    it('should move the bar ahead', function () {
      clock.tick(500)
      wrapper.update()
      assert.equal(wrapper.find(ReactProgressBar).at(0).prop('now'), 75)
    })

    it('should not move the bar ahead if prop passed in is the same as current prop', function () {
      wrapper.setState({ testState: 75 })
      clock.tick(500)
      wrapper.update()
      assert.equal(wrapper.find(ReactProgressBar).at(0).prop('now'), 75)
    })

    it('should move the bar ahead to 100 if prop changed', function () {
      wrapper.setState({ testState: 100 })
      clock.tick(500)
      wrapper.update()
      assert.equal(wrapper.find(ReactProgressBar).at(0).prop('now'), 100)
    })

    it('should call clearTimeout() when unmounted', function () {
      const spy = sinon.spy(clock, 'clearTimeout')
      wrapper.unmount()
      assert(spy.calledOnce)
    })
  })
})

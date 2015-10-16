'use strict';

require('react-tests-globals-setup');
var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var shallowRender = require('react-shallow-render');
var TestUtils = React.addons.TestUtils;

var assert = require('assert');
var sinon = require('sinon');

var ProgressBar = require('../src/ProgressBar');

var defaultProps = {
  now: 100,
  duration: 1,
  title: null,
  subtitle: null,
  type: 'info'
};

describe('ProgressBar', function() {

  it('is an element', function() {
    assert(TestUtils.isElement(<ProgressBar />));
  });

  it('has default values for many props', function() {
    var element = <ProgressBar />;
    assert.deepEqual(element.props, defaultProps);
  });

  context('with no properties', function() {

    var renderOutput;
    before(function() {
      renderOutput = shallowRender(<ProgressBar />);
    });

    it('returns a react-bootstrap panel', function() {
      assert.equal(renderOutput.type, ReactBootstrap.Panel);
    });

    it('should count 4 children', function() {
      assert.equal(React.Children.count(renderOutput.props.children), 4);
    });

    context('1st child', function() {
      it('should be a style tag', function() {
        assert.equal(renderOutput.props.children[0].type, 'style');
      });
    });

    context('3rd child', function() {
      it('should be a ReactBootstrap ProgressBar', function() {
        assert.equal(renderOutput.props.children[2].type, ReactBootstrap.ProgressBar);
      });

      it('should have the same bsStyle prop as the parent', function() {
        assert.equal(renderOutput.props.children[2].props.bsStyle, renderOutput.props.bsStyle);
      });
    });

    context('2nd & 4th child', function() {
      it('should be undefined', function() {
        assert.equal(renderOutput.props.children[3], undefined);
        assert.equal(renderOutput.props.children[1], undefined);
      });
    });

  });

  context('with a title', function() {
    it('should have the title set on the panel', function() {
      var title = 'This is a title';
      var renderOutput = shallowRender(<ProgressBar title={title} />);
      assert.equal(renderOutput.props.header, title);
    });
  });

  context('with a subtitle', function() {

    var renderOutput;
    var subtitle = 'This is a subtitle';
    before(function() {
      renderOutput = shallowRender(<ProgressBar subtitle={subtitle} />);
    });

    it('should have a 2nd child that is a paragraph', function() {
      assert.equal(renderOutput.props.children[1].type, 'p');
    });

    it('should have the correct text', function() {
      assert.equal(renderOutput.props.children[1].props.children, subtitle);
    });
  });

  context('render into document', function() {

    var testParent, element, clock, now;
    before(function() {
      clock = sinon.useFakeTimers();
      now = 75;
      testParent = React.createFactory(React.createClass({
        getInitialState: function() {
          return { testState: now };
        },
        render: function() {
          return <ProgressBar ref="sot" now={this.state.testState} />;
        }
      }));

      element = TestUtils.renderIntoDocument(testParent());
    });

    after(function() {
      clock.restore();
    });

    it('should be an instance of ProgressBar', function() {
      assert(TestUtils.isCompositeComponentWithType(element.refs.sot, ProgressBar));
    });

    it('should move the bar ahead', function() {
      clock.tick(500);
      var progressBars = TestUtils.scryRenderedComponentsWithType(element.refs.sot, ReactBootstrap.ProgressBar);
      assert.equal(progressBars[0].props.now, now);
    });

    it('should not move the bar ahead if prop passed in is the same as current prop', function() {
      element.setState({
        testState: now
      });
      var progressBars = TestUtils.scryRenderedComponentsWithType(element.refs.sot, ReactBootstrap.ProgressBar);
      assert.equal(progressBars[0].props.now, now);
    });

    it('should move the bar ahead to 100 if prop changed', function() {
      element.setState({
        testState: 100
      });
      var progressBars = TestUtils.scryRenderedComponentsWithType(element.refs.sot, ReactBootstrap.ProgressBar);
      assert.equal(progressBars[0].props.now, 100);
    });

  });

});

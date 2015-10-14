'use strict';

var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var shallowRender = require('react-shallow-render');
var TestUtils = React.addons.TestUtils;

var assert = require('assert');

var ProgressBar = require('../src/ProgressBar');

var defaultProps = {
  now: 100,
  title: null,
  type: 'info'
};

// No need for too many tests here as we are using react bootstrap library
// so we can rely on the tests for that library covering us.
describe('ProgressBar', function() {

  it('is an element', function() {
    assert(TestUtils.isElement(<ProgressBar />));
  });

  it('has default values for many props', function() {
    var element = <ProgressBar />;
    assert.deepEqual(element.props, defaultProps);
  });

  context('with no children passed in', function() {

    var renderOutput;
    before(function() {
      renderOutput = shallowRender(<ProgressBar />);
    });

    it('returns a react-bootstrap panel', function() {
      assert.equal(renderOutput.type, ReactBootstrap.Panel);
    });

    it('should count 2 children', function() {
      assert.equal(React.Children.count(renderOutput.props.children), 2);
    });

    context('1st child (progress bar)', function() {
      it('should be a ReactBootstrap ProgressBar', function() {
        assert.equal(renderOutput.props.children[0].type, ReactBootstrap.ProgressBar);
      });

      it('should have the same bsStyle prop as the parent', function() {
        assert.equal(renderOutput.props.children[0].props.bsStyle, renderOutput.props.bsStyle);
      });
    });

    context('2nd child (this.props.children property)', function() {
      it('should be undefined', function() {
        assert.equal(renderOutput.props.children[1], undefined);
      });
    });

  });

  context('with a child passed in', function() {

    var renderOutput;
    before(function() {
      renderOutput = shallowRender(<ProgressBar><h1>Foobar</h1></ProgressBar>);
    });

    it('returns a react-bootstrap panel', function() {
      assert.equal(renderOutput.type, ReactBootstrap.Panel);
    });

    it('should count 2 children', function() {
      assert.equal(React.Children.count(renderOutput.props.children), 2);
    });

    context('1st child (progress bar)', function() {
      it('should be a ReactBootstrap ProgressBar', function() {
        assert.equal(renderOutput.props.children[0].type, ReactBootstrap.ProgressBar);
      });

      it('should have the same bsStyle prop as the parent', function() {
        assert.equal(renderOutput.props.children[0].props.bsStyle, renderOutput.props.bsStyle);
      });
    });

    context('2nd child (this.props.children property)', function() {
      it('should be a h1', function() {
        assert.equal(renderOutput.props.children[1].type, 'h1');
      });
    });

  });

});

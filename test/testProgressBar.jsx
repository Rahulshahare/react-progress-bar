'use strict';

var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var shallowRender = require('react-shallow-render');
var TestUtils = React.addons.TestUtils;

var assert = require('assert');

var ProgressBar = require('../src/ProgressBar');

var defaultProps = {
  now: 100,
  title: null
};

// No need for too many tests here as we are using react bootstrap library
// so we can rely on the tests for that library covering us.
describe('ProgressBar', function() {

  describe('with no props passed', function() {
    it('is an element', function() {
      assert(TestUtils.isElement(<ProgressBar />));
    });

    it('has default values for many props', function() {
      var element = <ProgressBar />;
      assert.deepEqual(element.props, defaultProps);
    });

    it('returns a react-bootstrap panel', function() {
      var renderOutput = shallowRender(<ProgressBar />);
      assert.equal(renderOutput.type, ReactBootstrap.Panel);
    });

    it('contains a single react progressbar inside the panel', function() {
      var renderOutput = shallowRender(<ProgressBar />);
      var child = React.Children.only(renderOutput.props.children);
      assert.equal(child.type, ReactBootstrap.ProgressBar);
    });

  });

});

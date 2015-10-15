'use strict';

var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var shallowRender = require('react-shallow-render');
var TestUtils = React.addons.TestUtils;

var assert = require('assert');

var ProgressBar = require('../src/ProgressBar');

var defaultProps = {
  now: 0,
  title: null,
  subtitle: null,
  type: 'info',
  loadTime: null,
  interval: 500
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

  context('with no props', function() {

    var renderOutput;
    before(function() {
      renderOutput = shallowRender(<ProgressBar />);
    });

    it('returns a react-bootstrap panel', function() {
      assert.equal(renderOutput.type, ReactBootstrap.Panel);
    });

    it('should count 3 children', function() {
      assert.equal(React.Children.count(renderOutput.props.children), 3);
    });

    context('1st child & 3rd child', function() {
      it('should be undefined', function() {
        assert.equal(renderOutput.props.children[0], undefined);
        assert.equal(renderOutput.props.children[2], undefined);
      });
    });

    context('2nd child', function() {
      it('should be a ReactBootstrap ProgressBar', function() {
        assert.equal(renderOutput.props.children[1].type, ReactBootstrap.ProgressBar);
      });

      it('should have the same bsStyle prop as the parent', function() {
        assert.equal(renderOutput.props.children[1].props.bsStyle, renderOutput.props.bsStyle);
      });
    });

  });

  context('with a child', function() {

    var renderOutput;
    before(function() {
      renderOutput = shallowRender(<ProgressBar><h1>Foobar</h1></ProgressBar>);
    });

    it('returns a react-bootstrap panel', function() {
      assert.equal(renderOutput.type, ReactBootstrap.Panel);
    });

    context('3rd child', function() {
      it('should be a h1', function() {
        assert.equal(renderOutput.props.children[2].type, 'h1');
      });
    });

  });

  context('with a value set for now property', function() {

    var renderOutput;
    var now = 42;
    before(function() {
      renderOutput = shallowRender(<ProgressBar now={now}></ProgressBar>);
    });

    it('returns a react-bootstrap panel', function() {
      assert.equal(renderOutput.type, ReactBootstrap.Panel);
    });

    context('2nd child', function() {
      it('should be a ReactBootstrap ProgressBar', function() {
        assert.equal(renderOutput.props.children[1].type, ReactBootstrap.ProgressBar);
      });

      it('should have the now property set', function() {
        assert.equal(renderOutput.props.children[1].props.now, now);
      });
    });

  });

  context('with a title', function() {

    var renderOutput;
    var title = 'Hello World';
    before(function() {
      renderOutput = shallowRender(<ProgressBar title={title}></ProgressBar>);
    });

    it('returns a react-bootstrap panel', function() {
      assert.equal(renderOutput.type, ReactBootstrap.Panel);
    });

    context('react bootstrap panel', function() {
      it('should have a header property that matches title', function() {
        assert.equal(renderOutput.props.header, title);
      });
    });

  });

  context('with a subtitle', function() {

    var renderOutput;
    var subtitle = 'Hello World';
    before(function() {
      renderOutput = shallowRender(<ProgressBar subtitle={subtitle}></ProgressBar>);
    });

    it('returns a react-bootstrap panel', function() {
      assert.equal(renderOutput.type, ReactBootstrap.Panel);
    });

    context('1st child', function() {
      it('should be a paragraph', function() {
        assert.equal(renderOutput.props.children[0].type, 'p');
      });

      it('should have the expected text', function() {
        assert.equal(renderOutput.props.children[0].props.children, subtitle);
      });
    });

  });

  context('with a type', function() {
    var renderOutput;
    var type = 'warning';
    before(function() {
      renderOutput = shallowRender(<ProgressBar type={type}></ProgressBar>);
    });

    it('returns a react-bootstrap panel', function() {
      assert.equal(renderOutput.type, ReactBootstrap.Panel);
    });

    context('react bootstrap panel', function() {
      it('should have a bsStyle property that matches type', function() {
        assert.equal(renderOutput.props.bsStyle, type);
      });
    });

    context('2nd child', function() {
      it('should be a ReactBootstrap ProgressBar', function() {
        assert.equal(renderOutput.props.children[1].type, ReactBootstrap.ProgressBar);
      });

      it('should have the same bsStyle prop as the parent', function() {
        assert.equal(renderOutput.props.children[1].props.bsStyle, renderOutput.props.bsStyle);
      });
    });

  });

  context('with a loadTime', function() {

    var renderOutput;
    before(function() {
      renderOutput = shallowRender(<ProgressBar loadTime={20}></ProgressBar>);
    });

    it('returns a react-bootstrap panel', function() {
      assert.equal(renderOutput.type, ReactBootstrap.Panel);
    });

  });

});

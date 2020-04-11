const chai = require("chai");
const expect = chai.expect;

const spies = require("chai-spies");
chai.use(spies);

const domUpdates = require("../src/domUpdates.js");
const Box = require("../src/Box.js");

global.localStorage = {}

chai.spy.on(localStorage, ["setItem", "getItem"]);
chai.spy.on(domUpdates, "updateSize", () => true);

console.log(global.localStorage)

describe("Box", function() {

  afterEach(() => {
    domUpdates.updateSize.__spy.calls = []
    global.localStorage.setItem.__spy.calls = []
  });

  it("should return true", function() {
    expect(true).to.equal(true);
  });

  it("should have a default height and a width", function() {
    var box = new Box();

    expect(box.height).to.equal(100);
    expect(box.width).to.equal(100);
  });

  it("should have take a height and a width as arguments", function() {
    var box = new Box(50, 40);

    expect(box.height).to.equal(50);
    expect(box.width).to.equal(40);
  });

  it("should calculate its area", function() {
    var box = new Box(30, 30);

    expect(box.area()).to.equal(900);
  });

  describe("incrementSize", function() {
    it("should increase the width when passed width as a parameter", function() {
      var box = new Box(30, 30);
      box.incrementSize(100, "width");
      expect(domUpdates.updateSize).to.have.been.called(1);
      expect(box.width).to.equal(130);
    });

    it("should increase the height when passed height as a parameter", function() {
      var box = new Box(30, 30);
      box.incrementSize(100, "height");
      expect(domUpdates.updateSize).to.have.been.called(1);
      expect(box.height).to.equal(130);
    });
  });

  describe("saveDetails", function() {
    it("should save details to localStorage", function() {
      var box = new Box(100, 100);
      box.saveDetails();
      expect(localStorage.setItem).to.have.been.called(1);
      expect(localStorage.setItem).to.have.been.called.with('box', '{"height":100,"width":100}');
    });
  });
});

const sinon = require('sinon');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./4-payment');
const Utils = require('./utils');

describe('sendPaymentRequestToApi', () => {
  let calculateNumberStub;
  let consoleLogSpy;

  beforeEach(() => {
    // Stub Utils.calculateNumber to always return 10
    calculateNumberStub = sinon.stub(Utils, 'calculateNumber').returns(10);

    // Spy on console.log
    consoleLogSpy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    // Restore the stub and spy after each test
    calculateNumberStub.restore();
    consoleLogSpy.restore();
  });

  it('should call Utils.calculateNumber with type = SUM, a = 100, b = 20', () => {
    // Call the function under test
    sendPaymentRequestToApi(100, 20);

    // Verify that Utils.calculateNumber was called correctly
    expect(calculateNumberStub.calledOnce).to.be.true;
    expect(calculateNumberStub.calledWithExactly('SUM', 100, 20)).to.be.true;
  });

  it('should log the correct message "The total is: 10"', () => {
    // Call the function under test
    sendPaymentRequestToApi(100, 20);

    // Verify that console.log was called with the correct message
    expect(consoleLogSpy.calledOnce).to.be.true;
    expect(consoleLogSpy.calledWithExactly('The total is: 10')).to.be.true;
  });
});

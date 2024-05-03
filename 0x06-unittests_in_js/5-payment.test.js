const sinon = require('sinon');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', () => {
  let consoleLogSpy;

  beforeEach(() => {
    // Create a spy on console.log before each test
    consoleLogSpy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    // Restore the spy after each test
    consoleLogSpy.restore();
  });

  it('should log "The total is: 120" when called with totalAmount = 100 and totalShipping = 20', () => {
    // Call the function under test
    sendPaymentRequestToApi(100, 20);

    // Verify the behavior of console.log
    expect(consoleLogSpy.calledOnce).to.be.true;
    expect(consoleLogSpy.calledWithExactly('The total is: 120')).to.be.true;
  });

  it('should log "The total is: 20" when called with totalAmount = 10 and totalShipping = 10', () => {
    // Call the function under test
    sendPaymentRequestToApi(10, 10);

    // Verify the behavior of console.log
    expect(consoleLogSpy.calledOnce).to.be.true;
    expect(consoleLogSpy.calledWithExactly('The total is: 20')).to.be.true;
  });
});

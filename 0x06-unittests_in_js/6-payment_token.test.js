const { expect } = require('chai');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', () => {
  it('should resolve with { data: "Successful response from the API" } when success is true', (done) => {
    getPaymentTokenFromAPI(true)
      .then((result) => {
        expect(result).to.deep.equal({ data: 'Successful response from the API' });
        done(); //indicate that the test is complete
      })
      .catch((error) => {
        done(error);
      });
  });

  // Additional in the requirements)
  it('should resolve with undefined when success is false', (done) => {
    getPaymentTokenFromAPI(false)
      .then((result) => {
        expect(result).to.be.undefined;
        done(); // Call done to indicate that the test is complete
      })
      .catch((error) => {
        done(error);
      });
  });
});

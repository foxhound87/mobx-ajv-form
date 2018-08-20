import { expect } from 'chai';

export default ($) => {
  describe('Form validate()', () => {
    // $L
    it('$L validate() should be false', (done) => {
      $.$L.validate().then(({ isValid }) => {
        describe('Form $L checks after validate()', () => {
          it('$L state.options "validateOnChange" should be true', () =>
            expect($.$L.state.options.get('validateOnChange')).to.be.true);

          it('$L email hasError should be true', () =>
            expect($.$L.$('email').hasError).to.be.true);
        });

        expect(isValid).to.be.false; // eslint-disable-line
        done();
      });
    });
  });
};

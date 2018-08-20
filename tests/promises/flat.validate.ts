import { expect } from 'chai';

export default ($) => {
  describe('Form validate()', () => {
    // $A
    it('$A email validate() should be true', (done) => {
      $.$A.$('email').validate().then(({ isValid }) => {
        expect(isValid).to.be.true; // eslint-disable-line
        expect($.$A.errors().email).to.be.null; // eslint-disable-line
        expect($.$A.$('email').errors()).to.be.null; // eslint-disable-line
        done();
      });
    });

    // $B
    it('$B validate() should be false', (done) => {
      $.$B.validate().then(({ isValid }) => {
        expect(isValid).to.be.false; // eslint-disable-line
        done();
      });
    });

    // $E
    it('$E validate() should be true', (done) => {
      $.$E.validate().then(({ isValid }) => {
        expect(isValid).to.be.true; // eslint-disable-line
        done();
      });
    });

    // $L
    it('$L validate() should be false', (done) => {
      $.$L.validate().then(({ isValid }) => {
        expect(isValid).to.be.false; // eslint-disable-line
        done();
      });
    });

    // $M
    it('$M validate() should be false', (done) => {
      $.$M.validate().then(({ isValid }) => {
        expect(isValid).to.be.false; // eslint-disable-line
        done();
      });
    });

    // $N
    it('$N validate() should be false', (done) => {
      $.$N.validate().then(({ isValid }) => {
        expect(isValid).to.be.false; // eslint-disable-line
        done();
      });
    });
  });
};

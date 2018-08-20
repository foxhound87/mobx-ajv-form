import { expect } from 'chai';

export default ($) => {
  describe('Form isPristine', () => {
    it('$A isPristine should be true', () => expect($.$A.isPristine).to.be.true);
    it('$B isPristine should be true', () => expect($.$B.isPristine).to.be.true);
    it('$C isPristine should be true', () => expect($.$C.isPristine).to.be.true);
    it('$D isPristine should be false', () => expect($.$D.isPristine).to.be.false);
    it('$E isPristine should be true', () => expect($.$E.isPristine).to.be.true);
    it('$F isPristine should be true', () => expect($.$F.isPristine).to.be.true);
    it('$G isPristine should be true', () => expect($.$G.isPristine).to.be.true);
    it('$H isPristine should be true', () => expect($.$H.isPristine).to.be.true);
    it('$I isPristine should be true', () => expect($.$I.isPristine).to.be.true);
    it('$L isPristine should be false', () => expect($.$L.isPristine).to.be.false);
    it('$M isPristine should be true', () => expect($.$M.isPristine).to.be.true);
    it('$N isPristine should be true', () => expect($.$N.isPristine).to.be.true);
  });
};

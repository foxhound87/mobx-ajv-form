import { expect } from 'chai';

export default ($) => {
  describe('Form hasError', () => {
    it('$A hasError should be false', () => expect($.$A.hasError).to.be.false);
    it('$B hasError should be true', () => expect($.$B.hasError).to.be.true);
    it('$C hasError should be true', () => expect($.$C.hasError).to.be.true);
    it('$D hasError should be true', () => expect($.$D.hasError).to.be.true);
    it('$E hasError should be false', () => expect($.$E.hasError).to.be.false);
    it('$F hasError should be true', () => expect($.$F.hasError).to.be.true);
    it('$G hasError should be false', () => expect($.$G.hasError).to.be.false);
    it('$H hasError should be false', () => expect($.$H.hasError).to.be.false);
    it('$I hasError should be false', () => expect($.$I.hasError).to.be.false);
    it('$L hasError should be true', () => expect($.$L.hasError).to.be.true);
    it('$M hasError should be true', () => expect($.$M.hasError).to.be.true);
    it('$N hasError should be true', () => expect($.$N.hasError).to.be.true);
    it('$O hasError should be false', () => expect($.$O.hasError).to.be.false);
    it('$P hasError should be true', () => expect($.$P.hasError).to.be.true);
  });
};

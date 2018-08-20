import { expect } from 'chai';

export default ($) => {
  describe('Form isValid', () => {
    it('$A isValid should be true', () => expect($.$A.isValid).to.be.true);
    it('$B isValid should be false', () => expect($.$B.isValid).to.be.false);
    it('$C isValid should be false', () => expect($.$C.isValid).to.be.false);
    it('$D isValid should be false', () => expect($.$D.isValid).to.be.false);
    it('$E isValid should be true', () => expect($.$E.isValid).to.be.true);
    it('$F isValid should be false', () => expect($.$F.isValid).to.be.false);
    it('$G isValid should be true', () => expect($.$G.isValid).to.be.true);
    it('$H isValid should be true', () => expect($.$H.isValid).to.be.true);
    it('$I isValid should be true', () => expect($.$I.isValid).to.be.true);
    it('$L isValid should be false', () => expect($.$L.isValid).to.be.false);
    it('$M isValid should be false', () => expect($.$M.isValid).to.be.false);
    it('$N isValid should be false', () => expect($.$N.isValid).to.be.false);
    it('$O isValid should be true', () => expect($.$O.isValid).to.be.true);
    it('$P isValid should be false', () => expect($.$P.isValid).to.be.false);
  });
};

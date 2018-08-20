import { expect } from 'chai';

export default ($) => {
  describe('Form isDirty', () => {
    it('$A isDirty should be false', () => expect($.$A.isDirty).to.be.false);
    it('$B isDirty should be false', () => expect($.$B.isDirty).to.be.false);
    it('$C isDirty should be false', () => expect($.$C.isDirty).to.be.false);
    it('$D isDirty should be true', () => expect($.$D.isDirty).to.be.true);
    it('$E isDirty should be false', () => expect($.$E.isDirty).to.be.false);
    it('$F isDirty should be false', () => expect($.$F.isDirty).to.be.false);
    it('$G isDirty should be false', () => expect($.$G.isDirty).to.be.false);
    it('$H isDirty should be false', () => expect($.$H.isDirty).to.be.false);
    it('$I isDirty should be false', () => expect($.$I.isDirty).to.be.false);
    it('$L isDirty should be true', () => expect($.$L.isDirty).to.be.true);
    it('$M isDirty should be false', () => expect($.$M.isDirty).to.be.false);
    it('$N isDirty should be false', () => expect($.$N.isDirty).to.be.false);
  });
};

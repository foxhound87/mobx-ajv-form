import { expect } from 'chai';

export default ($) => {
  describe('Form isEmpty', () => {
    it('$A isEmpty should be false', () => expect($.$A.isEmpty).to.be.false);
    it('$B isEmpty should be true', () => expect($.$B.isEmpty).to.be.true);
    it('$C isEmpty should be false', () => expect($.$C.isEmpty).to.be.false);
    it('$D isEmpty should be false', () => expect($.$D.isEmpty).to.be.false);
    it('$E isEmpty should be false', () => expect($.$E.isEmpty).to.be.false);
    it('$F isEmpty should be false', () => expect($.$F.isEmpty).to.be.false);
    it('$G isEmpty should be true', () => expect($.$G.isEmpty).to.be.true);
    it('$H isEmpty should be false', () => expect($.$H.isEmpty).to.be.false);
    it('$I isEmpty should be false', () => expect($.$I.isEmpty).to.be.false);
    it('$L isEmpty should be true', () => expect($.$L.isEmpty).to.be.true);
    it('$M isEmpty should be false', () => expect($.$M.isEmpty).to.be.false);
    it('$N isEmpty should be false', () => expect($.$N.isEmpty).to.be.false);
  });
};

import { expect } from 'chai';

import $ from './data/_.fixes'; // FORMS

describe('$A Field values checks', () => {
  it('$A qwerty value should be equal to "0"', () =>
    expect($.$A.$('qwerty').value).to.be.equal(0));
});

describe('$B Field values checks', () => {
  it('$B inventoryLevel.value value should be equal to "2"', () =>
    expect($.$B.$('inventoryLevel.value').value).to.be.equal(2));

  it('$B addOns[0].nested.value value should be equal to "3"', () =>
    expect($.$B.$('addOns[0].nested.value').value).to.be.equal(3));
});

describe('$C Field values checks', () => {
  it('$C itineraryItems[0].hotel.name value value should be equal to "The Plaza"', () =>
    expect($.$C.$('itineraryItems[0].hotel.name').value).to.be.equal('The Plaza'));

  it('$C itineraryItems[1].hotel.name value value should be equal to "Beverly Hills Hotel"', () =>
    expect($.$C.$('itineraryItems[1].hotel.name').value).to.be.equal('Beverly Hills Hotel'));

  it('$C itineraryItems[2].hotel.name value value should be equal to "Trump Hotel"', () =>
    expect($.$C.$('itineraryItems[2].hotel.name').value).to.be.equal('Trump Hotel'));
});

describe('$D Field values checks', () => {
  it('$D itineraryItem value value should be equal to "itinerary-item-value"', () =>
    expect($.$D.$('itineraryItem').value).to.be.equal('itinerary-item-value'));

  it('$D itineraryItems[0].hotel.name value value should be equal to "New Test Name"', () =>
    expect($.$D.$('itineraryItems[0].hotel.name').value).to.be.equal('New Test Name'));

  it('$D itineraryItems[1].hotel.name value value should be equal to "New Test Name"', () =>
    expect($.$D.$('itineraryItems[1].hotel.name').value).to.be.equal('New Test Name'));

  it('$D itineraryItems[2].hotel.name value value should be equal to "New Test Name"', () =>
    expect($.$D.$('itineraryItems[2].hotel.name').value).to.be.equal('New Test Name'));
});

describe('$C Form values() method checks', () => {
  const prop = {
    0: 'itineraryItems[0].hotel.name',
    1: 'itineraryItems[1].hotel.name',
    2: 'itineraryItems[2].hotel.name',
  };

  it(`$C values() ${prop[0]} should be equal to "The Plaza"`, () =>
    expect($.$C.values()).to.have.deep.property(prop[0], 'The Plaza'));

  it(`$C values() ${prop[1]} should be equal to "Beverly Hills Hotel"`, () =>
    expect($.$C.values()).to.have.deep.property(prop[1], 'Beverly Hills Hotel'));

  it(`$C values() ${prop[2]} should be equal to "Trump Hotel"`, () =>
    expect($.$C.values()).to.have.deep.property(prop[2], 'Trump Hotel'));
});

describe('$D Form values() method checks', () => {
  const prop = {
    0: '[0].hotel.name',
    1: '[1].hotel.name',
    2: '[2].hotel.name',
  };

  it(`$D values() ${prop[0]} should be equal to "New Test Name"`, () =>
    expect($.$D.$('itineraryItems').values()).to.have.deep.property(prop[0], 'New Test Name'));

  it(`$D values() ${prop[1]} should be equal to "New Test Name"`, () =>
    expect($.$D.$('itineraryItems').values()).to.have.deep.property(prop[1], 'New Test Name'));

  it(`$D values() ${prop[2]} should be equal to "New Test Name"`, () =>
    expect($.$D.$('itineraryItems').values()).to.have.deep.property(prop[2], 'New Test Name'));
});

describe('Check Nested $E values()', () => {
  it('$E places values() should be array', () =>
    expect($.$E.$('places').values()).to.be.instanceof(Array));

  it('$E places values() should be length of 0', () =>
    expect($.$E.values().places).to.have.lengthOf(0));

  it('$E places values() should be length of 0', () =>
    expect($.$E.$('places').values()).to.have.lengthOf(0));
});

describe('Check Nested $F value computed', () => {
  it('$F inventoryLevel.value value should be equal to "2"', () =>
    expect($.$F.$('inventoryLevel.value').value).to.be.equal(2));

  it('$F places value should be array', () =>
    expect($.$F.$('places').value).to.be.instanceof(Array));

  it('$F places value should be length of 2', () =>
    expect($.$F.$('places').value).to.have.lengthOf(2));

  it('$F skills value should be array', () =>
    expect($.$F.$('skills').value).to.be.instanceof(Array));

  it('$F skills value should be length of 0', () =>
    expect($.$F.$('skills').value).to.have.lengthOf(0));

  it('$F date value should be equal to "1976-07-02T22:00:00.000Z"', () =>
    expect($.$F.$('date').value.getTime()).to.be.equal(new Date(1976, 6, 3).getTime()));

  it('$F members[0].hobbies value should be array', () =>
    expect($.$F.$('members[0].hobbies').value).to.be.instanceof(Array));

  it('$F members[0].hobbies value should be length of 3', () =>
    expect($.$F.$('members[0].hobbies').value).to.have.lengthOf(3));

  it('$F members[1].hobbies value should be array', () =>
    expect($.$F.$('members[1].hobbies').value).to.be.instanceof(Array));

  it('$F ids value should be length of 3', () =>
    expect($.$F.$('ids').value).to.have.lengthOf(3));

  it('$F ids value should be array', () =>
    expect($.$F.$('ids').value).to.be.instanceof(Array));
});

describe('Check Nested $H value computed', () => {
  it('$H items[0].name value should be equal to "Item #A"', () =>
    expect($.$H.$('items[0].name').value).to.be.equal('Item #A'));

  it('$H items[2].name value should be equal to "Item #3"', () =>
    expect($.$H.$('items[2].name').value).to.be.equal('Item #3'));

  it('$H singleFieldArray value should be array', () =>
    expect($.$H.$('singleFieldArray').value).to.be.instanceof(Array));

  it('$H singleFieldEmptyArray value should be array', () =>
    expect($.$H.$('singleFieldEmptyArray').value).to.be.instanceof(Array));

  it('$H singleFieldEmptyObject value should be object', () =>
    expect($.$H.$('singleFieldEmptyObject').value).to.be.instanceof(Object));

  it('$H singleFieldArray value should be array', () =>
    expect($.$H.$('singleFieldArray').value).to.have.lengthOf(1));

  it('$H singleFieldEmptyArray value should be array', () =>
    expect($.$H.$('singleFieldEmptyArray').value).to.have.lengthOf(0));
});

describe('Check Fixes $I values', () => {
  it('$I layout.column1[0].title value should be a equal to "THE NEW TITLE"', () =>
    expect($.$I.$('layout.column1[0].title').value).to.be.equal('THE NEW TITLE'));

  it('$I deep.nested.column2[0].title value should be a equal to "THE NEW TITLE"', () =>
    expect($.$I.$('deep.nested.column2[0].title').value).to.be.equal('THE NEW TITLE'));

  it('$I deep.nested.column3[0].title value should be a equal to "THE NEW TITLE"', () =>
    expect($.$I.$('deep.nested.column3[0].title').value).to.be.equal('THE NEW TITLE'));
});

describe('Check Fixes $M values', () => {
  it('$M people[0].name value should be null', () =>
    expect($.$M.$('people[0].name').value).to.be.null);

  it('$M items[0].name value should be equal to zero', () =>
    expect($.$M.$('items[0].name').value).to.be.equal(0));

  it('$M number value should be equal to zero', () =>
    expect($.$M.$('number').value).to.be.equal(0));

  it('$M array value should be length of 3', () =>
    expect($.$M.$('array').value).to.have.lengthOf(3));

  it('$M array value should be array', () =>
    expect($.$M.$('array').value).to.be.instanceof(Array));

  it('$M array[0].name value should be a equal to ""', () =>
    expect($.$M.$('array[0].name').value).to.be.equal(''));

  it('$M array[1].name value should be a equal to ""', () =>
    expect($.$M.$('array[0].name').value).to.be.equal(''));

  it('$M array[2].name value should be a equal to ""', () =>
    expect($.$M.$('array[2].name').value).to.be.equal(''));
});

describe('Check Fixes $O values', () => {
  it('$O roles value should be an array', () =>
    expect($.$O.$('roles').value).to.be.instanceof(Array));

  it('$O roles value should be empty', () =>
    expect($.$O.$('roles').value).to.be.empty);

  it('$O roles value should be an array', () =>
    expect($.$O.$('array').value).to.be.instanceof(Array));

  it('$O roles value should be empty', () =>
    expect($.$O.$('array').value).to.be.empty);
});

describe('Check Fixes $P values', () => {
  const values = { street: '123 Fake St.', zip: '12345' };
  const labels = { street: 'street-label', zip: 'zip-label' };

  it('$P address values() check', () =>
    expect($.$P.$('address').values()).to.be.deep.equal(values));

  it('$P address value check', () =>
    expect($.$P.$('address').value).to.be.deep.equal(values));

  it('$P address value check', () =>
    expect($.$P.$('address').labels()).to.be.deep.equal(labels));
});

describe('Check Fixes $Q values', () => {
  const a = [{ id: 1, name: 'name' }];
  const b = [{ id: 1, name: 'name', value: 'some val' }];

  it('$Q arrayFieldA values() check', () =>
    expect($.$Q.$('arrayFieldA').values()).to.be.deep.equal(a));

  it('$Q arrayFieldB values() check', () =>
    expect($.$Q.$('arrayFieldB').values()).to.be.deep.equal(b));

  it('$Q arrayFieldA value check', () =>
    expect($.$Q.$('arrayFieldA').value).to.be.deep.equal(a));

  it('$Q arrayFieldB value check', () =>
    expect($.$Q.$('arrayFieldB').value).to.be.deep.equal(b));
});

describe('Check Fixes $Q1 values', () => {
  it('$Q1 values check', () =>
    expect($.$Q1.values())
      .to.be.deep.equal({
        other: {
          nested: 'nested-value',
        },
        tags: [{
          id: 'x',
          name: 'y',
        }],
      }));
});

describe('Check Fixes $R values', () => {
  const a = $.$R.values().organization;
  const b = $.$R.$('organization').value;

  it('$R values().organization check', () =>
    expect(a).to.be.deep.equal(b));

  it('$R organization value check', () =>
    expect(b).to.be.deep.equal(b));
});

describe('Check Fixes $S deleting by path', () => {
  const a = $.$S.$('array');
  const hasItemToDelete3 = $.$S.has('item_to_delete3');

  it('$S array field check', () =>
    expect(a.size).to.eq(0));

  it('$S deleted from root', () =>
    expect(hasItemToDelete3).to.be.false);
});

describe('Check Fixes $425 values', () => {
  it('$425 values() check', () =>
    expect($.$425.values())
      .to.be.deep.equal({
        '1a': ' ',
        '2a': ' ',
        '3a': ' ',
      }));
});

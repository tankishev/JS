const {lookupChar} = require('./3_char_lookup');
const {assert} = require('chai');

describe ('Test function lookupChar', () => {
    it('return undefined if either of the input parameters is of wrong type', () => {
        assert.equal(lookupChar(10, 10), undefined);
        assert.equal(lookupChar('10', '10'), undefined);
        assert.equal(lookupChar(10, '10'), undefined);
    });

    it('return undefined if either of the input parameters is of wrong type', () => {        
        assert.equal(lookupChar({}, 1), undefined);
        assert.equal(lookupChar([], 1), undefined);
        assert.equal(lookupChar(1.34, 1), undefined);
        assert.equal(lookupChar(1, 1), undefined);
        assert.equal(lookupChar('test', {}), undefined);
        assert.equal(lookupChar('test', []), undefined);
        assert.equal(lookupChar('test', '1'), undefined);
        assert.equal(lookupChar('test', 1.23), undefined);
    });

    it('return incorrect index if index out of bounds', () => {        
        assert.equal(lookupChar('test', -1), "Incorrect index");
        assert.equal(lookupChar('test', 4), "Incorrect index");
        assert.equal(lookupChar('test', 5), "Incorrect index");
    });

    it('return incorrect index if index out of bounds', () => {        
        assert.equal(lookupChar('test', 0), "t");
        assert.equal(lookupChar('test', 1), "e");
        assert.equal(lookupChar('test', 2), "s");
    });

});
const {sum} = require('./4_sumNumbers');
const {assert} = require('chai');

describe('Test sumNumber', () => {
    it('works with integers', () => {
        const actual = sum([1, 2, 3]);
        const expected = 6;
        assert.equal(actual, expected);
        }
    );

    it('works with floating', () => {
        const actual = sum([1.33, 2.33, 3.34]);
        const expected = 7;
        assert.equal(actual, expected);
        }
    );
});
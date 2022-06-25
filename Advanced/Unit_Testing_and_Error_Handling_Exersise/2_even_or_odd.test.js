const {isOddOrEven} = require('./2_even_or_odd');
const {assert} = require('chai');

describe('Test function isOddOrEven', () => {
    it('returns the correct result on correct input', () => {
        assert.equal(isOddOrEven('two'), 'odd', 'Did not return odd on odd input');
        assert.equal(isOddOrEven('five'), 'even', 'Did not return even on even input');
        assert.equal(isOddOrEven('five is greater than two'), 'even', 'Did not return even on even input');
        }
    );

    it('returns undefined on non-string input', () => {
        assert.equal(isOddOrEven(12), undefined);
        assert.equal(isOddOrEven(1.54), undefined);
        assert.equal(isOddOrEven(['array']), undefined);
        assert.equal(isOddOrEven({type: 'object'}), undefined);
        assert.equal(isOddOrEven({type: 'object'}), undefined);
        }
    );
});
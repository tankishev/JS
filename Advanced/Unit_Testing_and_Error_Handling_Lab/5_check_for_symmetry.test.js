const {isSymmetric} = require('./5_check_for_symmetry');
const {assert} = require('chai');

describe('Test for symmetry', () => {
    it('returns false on wrong input type (string)', () => {
        const actual = isSymmetric('wrong input');
        const expected = false;
        assert.equal(actual, expected);
        }
    );


    it('returns false on wrong input type (number)', () => {
        const actual = isSymmetric(6);
        const expected = false;
        assert.equal(actual, expected);
        }
    );

    it('returns false on wrong input type (mismatched elements)', () => {
        const actual = isSymmetric([1,2,3,2,'1']);
        const expected = false;
        assert.equal(actual, expected);
        }
    );

    it('returns false non-symetric string array', () => {
        const actual = isSymmetric(['a', 'b', 'c', 'b']);
        const expected = false;
        assert.equal(actual, expected);
        }
    );

    it('returns false non-symetric number array', () => {
        const actual = isSymmetric([1, 0, 2, 3]);
        const expected = false;
        assert.equal(actual, expected);
        }
    );

    it('returns true on symmetric string input', () => {
        const actual = isSymmetric(['test', 'not', 'test']);
        const expected = true;
        assert.equal(actual, expected);
        }
    );

    it('returns true on symmetric number input', () => {
        const actual = isSymmetric([1,3,4,3,1]);
        const expected = true;
        assert.equal(actual, expected);
        }
    );

    it('returns true on empty array', () => {
        const actual = isSymmetric([]);
        const expected = true;
        assert.equal(actual, expected);
        }
    );
});
const {rgbToHexColor} = require('./6_RGB_to_HEX');
const {assert} = require('chai');

describe('Test for conversion RGB to Hex', () => {
    it('returns undefined on wrong input type', () => {
        assert.equal(rgbToHexColor('wrong input'), undefined);
        assert.equal(rgbToHexColor([1,2,3]), undefined);
        }
    );

    it('returns undefined on missing params', () => {
        assert.equal(rgbToHexColor(), undefined, 'all three');
        assert.equal(rgbToHexColor(6), undefined, 'missing two');
        assert.equal(rgbToHexColor(6, 6), undefined, 'missing one');
        }
    );

    it('returns undefined on wrong params type', () => {
        assert.equal(rgbToHexColor(1.22, 0, 0), undefined, 'float red');
        assert.equal(rgbToHexColor(0, 2.33, 0), undefined, 'float green');
        assert.equal(rgbToHexColor(0, 0, 45.55), undefined, 'float blue');
        assert.equal(rgbToHexColor('1', 1, 1), undefined, 'string red');
        assert.equal(rgbToHexColor(1, '1', 1), undefined, 'string green');
        assert.equal(rgbToHexColor(1, 1, '1'), undefined, 'string blue');
        }
    );

    it('returns undefined on out of range (lower bound)', () => {
        assert.equal(rgbToHexColor(-10, 254, 254), undefined, 'red');
        assert.equal(rgbToHexColor(254, -10, 254), undefined, 'green');
        assert.equal(rgbToHexColor(254, 254, -10), undefined, 'blue');
        }
    );
    
    it('returns undefined on out of range (upper bound)', () => {
        assert.equal(rgbToHexColor(300, 1, 1), undefined, 'red');
        assert.equal(rgbToHexColor(1, 300, 1), undefined, 'green');
        assert.equal(rgbToHexColor(1, 1, 300), undefined, 'blue');
        }
    );

    it('returns #0A0118 on input (10, 1, 24)', () => {
        const actual = rgbToHexColor(10, 1, 24);
        const expected = '#0A0118';
        assert.equal(actual, expected);
        }
    );

    it('returns #000000 on input (0, 0, 0)', () => {
        const actual = rgbToHexColor(0, 0, 0);
        const expected = '#000000';
        assert.equal(actual, expected);
        }
    );

    it('returns #FFFFFF on input (255, 255, 255)', () => {
        const actual = rgbToHexColor(255, 255, 255);
        const expected = '#FFFFFF';
        assert.equal(actual, expected);
        }
    );

    it('returns #ABCDEF on input (171, 205, 239)', () => {
        const actual = rgbToHexColor(171, 205, 239);
        const expected = '#ABCDEF';
        assert.equal(actual, expected);
        }
    );

    it('returns #010203 on input (1, 2, 3)', () => {
        const actual = rgbToHexColor(1, 2, 3);
        const expected = '#010203';
        assert.equal(actual, expected);
        }
    );

});
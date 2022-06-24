const {createCalculator} = require('./7_add_subtract');
const {assert} = require('chai');

describe('Test for conversion RGB to Hex', () => {
    it('returns undefined on wrong input type', () => {
        assert.equal(rgbToHexColor('wrong input'), undefined);
        assert.equal(rgbToHexColor([1,2,3]), undefined);
        }
    );
});


// •	Return a module (object), containing the functions add(), subtract() and get() as properties
// •	Keep an internal sum that can’t be modified from the outside
// •	The functions add() and subtract() take a parameter that can be parsed as a number (either a number or a string containing a number) that is added or subtracted from the internal sum
// •	The function get() returns the value of the internal sum

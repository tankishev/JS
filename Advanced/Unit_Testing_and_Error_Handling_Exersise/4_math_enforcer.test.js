const {mathEnforcer} = require('./4_math_enforcer');
const {assert} = require('chai');

describe ('Test function mathEnforcer', () => {
    it('has all methods', () => {
        assert.property(mathEnforcer, 'addFive', 'does not have addFive');
        assert.property(mathEnforcer, 'subtractTen', 'does not have subtractTen');
        assert.property(mathEnforcer, 'sum', 'does not have sum');
    });

    describe ('test addFive', () => {
        it('return undefined if a parameter is not a number', () => {
            assert.equal(mathEnforcer.addFive('0'), undefined);
            assert.equal(mathEnforcer.addFive({ }), undefined);
            assert.equal(mathEnforcer.addFive([0]), undefined);
        });

        it('returns correct result', () => {
            assert.equal(mathEnforcer.addFive(-1), 4);
            assert.equal(mathEnforcer.addFive(0), 5);
            assert.equal(mathEnforcer.addFive(1), 6);
            assert.equal(mathEnforcer.addFive(-1.5), 3.5);
            assert.equal(mathEnforcer.addFive(0.5), 5.5);
            assert.equal(mathEnforcer.addFive(1.5), 6.5);
        });
    });

    describe ('test subtractTen', () => {
        it('return undefined if a parameter is not a number', () => {
            assert.equal(mathEnforcer.subtractTen('0'), undefined);
            assert.equal(mathEnforcer.subtractTen({ }), undefined);
            assert.equal(mathEnforcer.subtractTen([0]), undefined);
        });
        
        it('returns correct result', () => {
            assert.equal(mathEnforcer.subtractTen(-1), -11);
            assert.equal(mathEnforcer.subtractTen(0), -10);
            assert.equal(mathEnforcer.subtractTen(1), -9);
            assert.equal(mathEnforcer.subtractTen(-1.2), -11.2);
            assert.equal(mathEnforcer.subtractTen(0.2), -9.8);
            assert.equal(mathEnforcer.subtractTen(1.2), -8.8);
        });
    });

    describe ('test sum', () => {
        it('return undefined if a parameter is not a number', () => {
            assert.equal(mathEnforcer.sum('0', 1), undefined);
            assert.equal(mathEnforcer.sum({ }, 1), undefined);
            assert.equal(mathEnforcer.sum([0], 1), undefined);
            assert.equal(mathEnforcer.sum(1, '0'), undefined);
            assert.equal(mathEnforcer.sum(1, { }), undefined);
            assert.equal(mathEnforcer.sum(1, [0]), undefined);
        });

        it('returns correct result', () => {
            assert.equal(mathEnforcer.sum(1, 2.6), 3.6);
            assert.equal(mathEnforcer.sum(-1, 2.5), 1.5);
            assert.equal(mathEnforcer.sum(-1.5, -2), -3.5);
            assert.equal(mathEnforcer.sum(0, 2), 2);
            assert.equal(mathEnforcer.sum(1, 0), 1);
            assert.equal(mathEnforcer.sum(0, 0), 0);
        });
    });        
});
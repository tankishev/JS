const {rentCar} = require('./rentCar');
const {assert} = require('chai');

describe('Test rentCar object', () => {
    describe('searchCar', () => {
        it('throws error with invalid input type', () => {
            assert.throws(() => {rentCar.searchCar('shop', 'model')}, Error, "Invalid input!");
            assert.throws(() => {rentCar.searchCar(123, 'model')}, Error, "Invalid input!");
            assert.throws(() => {rentCar.searchCar(1.33, 'model')}, Error, "Invalid input!");
            assert.throws(() => {rentCar.searchCar({}, 'model')}, Error, "Invalid input!");
            assert.throws(() => {rentCar.searchCar(['shop', 'shop'], [])}, Error, "Invalid input!");
            assert.throws(() => {rentCar.searchCar(['shop', 'shop'], 123)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.searchCar(['shop', 'shop'], 1.23)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.searchCar(['shop', 'shop'], {})}, Error, "Invalid input!");
        });

        it('finds model in list if available', () => {
            let expect = 'There is 1 car of model vw in the catalog!';
            assert.equal(rentCar.searchCar(['bmw', 'audi', 'vw'], 'vw'), expect);
            expect = 'There is 3 car of model bmw in the catalog!';
            assert.equal(rentCar.searchCar(['bmw', 'audi', 'bmw', 'vw', 'bmw'], 'bmw'), expect);
        });

        it('returns not found if model not in shop', () => {
            const expect = 'There are no such models in the catalog!';
            assert.throws(() => {rentCar.searchCar(['bmw', 'audi', 'vw'], 'renault')}, Error, expect);
        });

    });

    describe('calculatePriceOfCar', () => {
        it('throws error with invalid input type', () => {
            assert.throws(() => {rentCar.calculatePriceOfCar([], 1)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.calculatePriceOfCar(123, 1)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.calculatePriceOfCar(1.33, 1)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.calculatePriceOfCar({}, 2)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.calculatePriceOfCar('shop', [])}, Error, "Invalid input!");
            assert.throws(() => {rentCar.calculatePriceOfCar('shop', '123')}, Error, "Invalid input!");
            assert.throws(() => {rentCar.calculatePriceOfCar('shop', 1.23)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.calculatePriceOfCar('shop', {})}, Error, "Invalid input!");
        });

        it('returns model and price for given number of days', () => {
            let expect = 'You choose Toyota and it will cost $40!';
            assert.equal(rentCar.calculatePriceOfCar('Toyota', 1), expect);
            expect = 'You choose Toyota and it will cost $120!';
            assert.equal(rentCar.calculatePriceOfCar('Toyota', 3), expect);
        });

        it('returns no such model if not in catalogue', () => {
            const expect = 'No such model in the catalog!';
            assert.throws(() => {rentCar.calculatePriceOfCar('bmw', 10)}, Error, expect);
        });
    });

    describe('checkBudget', () => {
        it('throws error with invalid input type', () => {
            assert.throws(() => {rentCar.checkBudget(1.23, 1, 1)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget('1', 1, 1)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget([1], 1, 1)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget({}, 1, 1)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget(1, {}, 1)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget(1, [1], 1)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget(1, '1', 1)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget(1, 1.23, 1)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget(1, 1, 1.23)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget(1, 1, '1')}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget(1, 1, [1])}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget(1, 1, {})}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget()}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget(1)}, Error, "Invalid input!");
            assert.throws(() => {rentCar.checkBudget(1,1)}, Error, "Invalid input!");
        });

        it('returns budget not enough', () => {
            let expect = 'You need a bigger budget!';
            assert.equal(rentCar.checkBudget(100, 1, 80), expect);
            assert.equal(rentCar.checkBudget(50, 3, 120), expect);
        });

        it('returns you rented a car', () => {
            const expect = 'You rent a car!';
            assert.equal(rentCar.checkBudget(100, 1, 180), expect);
            assert.equal(rentCar.checkBudget(50, 3, 1120), expect);
        });
    });
});
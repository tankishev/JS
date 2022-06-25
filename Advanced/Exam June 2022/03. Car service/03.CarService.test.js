const {carService} = require('./03.CarService');
const {assert} = require('chai');

describe('Testint carService object', () => {
    describe('isItExpensive', () => {
        it('returns "its expensive" when issue is engine or transmission', () => {
            let expected = `The issue with the car is more severe and it will cost more money`;
            assert.equal(carService.isItExpensive('Engine'), expected);
            assert.equal(carService.isItExpensive('Transmission'), expected);
        });

        it('returns "its cheal" on other issues', () => {
            let expected = `The overall price will be a bit cheaper`;
            assert.equal(carService.isItExpensive('Engine2'), expected);
            assert.equal(carService.isItExpensive('Transmission3'), expected);
        });
    });

    describe('discount', () => {
        it('throws error with invalid input type', () => {
            assert.throws(() => {carService.discount('parts', 1)}, Error, "Invalid input");
            assert.throws(() => {carService.discount(['parts'], 1)}, Error, "Invalid input");
            assert.throws(() => {carService.discount({}, 1)}, Error, "Invalid input");
            assert.throws(() => {carService.discount(1, 'price')}, Error, "Invalid input");
            assert.throws(() => {carService.discount(1.21, ['price'])}, Error, "Invalid input");
            assert.throws(() => {carService.discount(1, {})}, Error, "Invalid input");
            assert.doesNotThrow(() => {carService.discount(1, 1)}, Error, "Invalid input");
        });

        it('cannot be applied for less than or equal to 2 parts', () =>{
            assert.equal(carService.discount(0, 100), "You cannot apply a discount");
            assert.equal(carService.discount(1, 100), "You cannot apply a discount");
            assert.equal(carService.discount(2, 100), "You cannot apply a discount");
        });

        it('applies the correct discount', () =>{
            assert.equal(carService.discount(3, 100), "Discount applied! You saved 15$");
            assert.equal(carService.discount(7, 200), "Discount applied! You saved 30$");
            assert.equal(carService.discount(8, 100), "Discount applied! You saved 30$");
        });
    });

    describe('partsToBuy', () => {

        it('returns correct total price', () =>{
            const partsCatalogue = [{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }];
            const neededParts = ["blowoff valve", "injectors", "coil springs"];
            assert.equal(carService.partsToBuy(partsCatalogue, neededParts), 375);
        });

        it('returns 0 on empty catalogue', () =>{
            const neededParts = ["blowoff valve", "injectors", "coil springs"];
            assert.equal(carService.partsToBuy([], neededParts), 0);
        });

        it('throws error with invalid input type', () => {
            const partsCatalogue = [{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }];
            const neededParts = ["blowoff valve", "injectors"];
            assert.throws(() => {carService.partsToBuy(1, neededParts)}, Error, "Invalid input");
            assert.throws(() => {carService.partsToBuy(1.12, neededParts)}, Error, "Invalid input");
            assert.throws(() => {carService.partsToBuy({}, neededParts)}, Error, "Invalid input");
            assert.throws(() => {carService.partsToBuy('parts', neededParts)}, Error, "Invalid input");
            assert.throws(() => {carService.partsToBuy(partsCatalogue, 1)}, Error, "Invalid input");
            assert.throws(() => {carService.partsToBuy(partsCatalogue, 1.12)}, Error, "Invalid input");
            assert.throws(() => {carService.partsToBuy(partsCatalogue, 'needs')}, Error, "Invalid input");
            assert.throws(() => {carService.partsToBuy(partsCatalogue, {})}, Error, "Invalid input");
            assert.doesNotThrow(() => {carService.partsToBuy(neededParts, partsCatalogue)}, Error, "Invalid input");
        });
    });
});
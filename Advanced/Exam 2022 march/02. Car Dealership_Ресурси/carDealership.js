class CarDealership {
    constructor(name){
        this.name = name;
        this.availableCars = [];
        this.soldCars = [];
        this.totalIncome = 0;
    }

    addCar(model, horsepower, price, mileage){
        let valid = true;
        if (typeof model != 'string' || model == ''){valid = false};
        if (typeof horsepower != 'number' || !(Number.isInteger(horsepower)) || horsepower < 0){valid = false};
        if (typeof price != 'number' || price < 0){valid = false};
        if (typeof mileage != 'number' || mileage < 0){valid = false};

        if (!valid){
            throw new Error("Invalid input!");
        }

        let car  = {model, horsepower, price, mileage};
        this.availableCars.push(car);

        return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(2)} km - ${price.toFixed(2)}$`;
    }

    sellCar(model, desiredMileage){
        const car = this.availableCars.find((el) => el.model == model)
        if (car == undefined){
            throw new Error(`${model} was not found!`);
        }
        let soldPrice = 0
        if (car.mileage <= desiredMileage){
            soldPrice = car.price;
        } else if (Math.abs(car.mileage - desiredMileage) <= 40000){
            soldPrice = car.price * 0.95;
        } else if (Math.abs(car.mileage - desiredMileage) > 40000){
            soldPrice = car.price * 0.9;
        }
        const idx = this.availableCars.indexOf(car);
        this.availableCars.splice(idx, 1);

        this.soldCars.push({model: car.model, horsepower: car.horsepower, soldPrice});
        this.totalIncome += soldPrice;

        return `${car.model} was sold for ${soldPrice.toFixed(2)}$`;
    }

    currentCar(){
        if (this.availableCars.length == 0){
            return "There are no available cars";
        }
        
        let retval = '-Available cars:\n';
        let output = this.availableCars.map((el) => `---${el.model} - ${el.horsepower} HP - ${el.mileage.toFixed(2)} km - ${el.price.toFixed(2)}$`);
        retval += output.join('\n');
        return retval;
    }

    salesReport(criteria){
        if (!(['horsepower', 'model'].includes(criteria))){
            throw new Error("Invalid criteria!");
        }
        let sortedList;
        if (criteria == 'horsepower'){
            sortedList = this.soldCars
            .map((el) => [el.horsepower, el])
            .sort((a, b) => b[0] - a[0]);
        } else {
            sortedList = this.soldCars
            .map((el) => [el.model, el])
            .sort((a, b) => a[0].localeCompare(b[0]))
        }
        
        let retval = `-${this.name} has a total income of ${this.totalIncome.toFixed(2)}$\n-${this.soldCars.length} cars sold:\n`;
        retval += sortedList.map((el) => `---${el[1].model} - ${el[1].horsepower} HP - ${el[1].soldPrice.toFixed(2)}$`).join('\n');
        return retval;
    }
}


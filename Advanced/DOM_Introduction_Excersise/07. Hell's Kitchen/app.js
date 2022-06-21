function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick () {
      const input = JSON.parse(document.querySelector('#inputs textarea').value);
      const output1 = document.querySelector('#bestRestaurant p');
      const output2 = document.querySelector('#workers p');
      

      const restaurants = {};
      const statistics = {};

      for (el of input){
         let [restaurantName, employees] = el.split(" - ");
         employees = employees.split(', ');

         if (!(restaurantName in restaurants)){
            restaurants[restaurantName] = {};
            statistics[restaurantName] = {totalSalary: 0, maxSalary: 0}
         }

         for (employee of employees){
            let [employeeName, salary] = employee.split(' ');
            salary = Number(salary);
            restaurants[restaurantName][employeeName] = salary;
            statistics[restaurantName]['totalSalary'] += salary;
            statistics[restaurantName]['maxSalary'] = Math.max(salary, statistics[restaurantName]['maxSalary']);
         }
      }
      const sortedRestaurants = []
      for (restaurantName in statistics){
         let avgSalary = statistics[restaurantName]['totalSalary'] / Object.keys(restaurants[restaurantName]).length;
         sortedRestaurants.push([restaurantName, avgSalary]);
      }
      sortedRestaurants.sort((a, b) => b[1] - a[1]);
      const [bestName, avgSalary] = sortedRestaurants[0];
      const bestSalary = statistics[bestName].maxSalary;
      const result1 = `Name: ${bestName} Average Salary: ${avgSalary.toFixed(2)} Best Salary: ${bestSalary.toFixed(2)}`;
      
      output1.textContent = result1;
      
      const result2 = Object.entries(restaurants[bestName])
         .sort((a, b) => b[1] - a[1])
         .map((el) => `Name: ${el[0]} With Salary: ${el[1]}`)
         .join(' ');

      output2.textContent = result2;
   }
}
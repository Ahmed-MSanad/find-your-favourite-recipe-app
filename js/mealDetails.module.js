

import {UI} from './UI.module.js'
let ui = new UI();

export class MealDetails{
    constructor(idMeal){
        this.idMeal = idMeal;
        $('#searchInputs').fadeOut(0);
        $('#contactUsSection').fadeOut(0);
        $('#detailsSection').fadeOut(0);
        $('#homePageMeals').html('');
        $('#innerLoadingScreen').fadeIn(0);
        ( async () => {
            let details = await this.fetchDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.idMeal}`);
            ui.displayDetails(details);
            $('#innerLoadingScreen').fadeOut(300);
            $('#mealsSection').fadeOut(0);
            $('#detailsSection').fadeIn(300);
        })();
    }

    async fetchDetails(api){
        let response = await fetch(api);
        let { meals } = await response.json();
        // console.log(meals[0]);
        return meals[0];
    }
};
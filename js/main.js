/// <reference types="../@types/jquery" />

import {MealDetails} from './mealDetails.module.js';
import {UI} from './UI.module.js';
import {ContactUs} from './contactUs.module.js'

let ui = new UI();

class Settings{
    constructor(){
        $('#asideLinks').hide(0);
        $('#searchInputs').fadeOut(0);
        $('#innerLoadingScreen').fadeOut(0);
        $('#detailsSection').fadeOut(0);
        $('#contactUsSection').fadeOut(0);
        $('#sidebarBtn').on('click',this.sideBarAction);
        (async () => {
            let meals = await this.fetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
            this.setupMeals(meals);
        })();
        $('#searchLink').on('click',this.searchLink.bind(this));
        $('#searchByName').on('input',(e) => {this.search(e.target.id);});
        $('#searchByFirstLetter').on('input',(e) => {this.search(e.target.id);});
        $('#categoriesLink').on('click',this.categoriesPage.bind(this));
        $('#areaLink').on('click',(e) => { this.areaPage(); });
        $('#ingredientLink').on('click',(e) => { this.ingredientPage(); });
        $('#contactUsLink').on('click',(e) => { 
            this.sideBarAction();
            $('#searchInputs').fadeOut(0);
            $('#detailsSection').fadeOut(0);
            $('#mealsSection').fadeOut(0);
            $('.alert').fadeOut(0);
            $('#contactUsSection').fadeIn(0);
        });
        new ContactUs();
    }

    async ingredientPage(){
        this.sideBarAction();
        $('#searchInputs').fadeOut(0);
        $('#detailsSection').fadeOut(0);
        $('#contactUsSection').fadeOut(0);
        $('#mealsSection').fadeIn(0);
        $('#homePageMeals').html('');
        $('#innerLoadingScreen').fadeIn(0);
        let ingredients = await this.fetchIngredients();
        ui.displayIngredients(ingredients);
        this.setupIngredient(ingredients);
        $('#innerLoadingScreen').fadeOut(300);
    }

    setupIngredient(ingredients){
        let allIngredients = document.querySelectorAll('.ingredient');
        for(let i = 0 ; i < allIngredients.length ; i++){
            allIngredients[i].addEventListener('click',async (e) => {
                $('#innerLoadingScreen').fadeIn(0);
                let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients[i].strIngredient}`);
                let { meals } = await response.json();
                ui.displayRecipes(meals);
                this.setupMeals(meals);
                $('#innerLoadingScreen').fadeOut(300);
            })
        }
    }

    async fetchIngredients(){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let { meals } = await response.json();
        // console.log(meals);
        return meals;
    }


    async areaPage(){
        this.sideBarAction();
        $('#searchInputs').fadeOut(0);
        $('#detailsSection').fadeOut(0);
        $('#contactUsSection').fadeOut(0);
        $('#mealsSection').fadeIn(0);
        $('#homePageMeals').html('');
        $('#innerLoadingScreen').fadeIn(0);
        let areas = await this.fetchAreas();
        ui.displayAreas(areas);
        this.setupAreas(areas);
        $('#innerLoadingScreen').fadeOut(300);
    }

    setupAreas(areas){
        let allAreas = document.querySelectorAll('.area');
        for(let i = 0 ; i < allAreas.length ; i++){
            allAreas[i].addEventListener('click',async (e) => {
                $('#innerLoadingScreen').fadeIn(0);
                let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areas[i].strArea}`);
                let { meals } = await response.json();
                ui.displayRecipes(meals);
                this.setupMeals(meals);
                $('#innerLoadingScreen').fadeOut(300);
            });
        }
    }

    async fetchAreas(){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let { meals } = await response.json();
        // console.log(meals);
        return meals;
    }


    async categoriesPage(){
        this.sideBarAction();
        $('#searchInputs').fadeOut(0);
        $('#detailsSection').fadeOut(0);
        $('#contactUsSection').fadeOut(0);
        $('#mealsSection').fadeIn(0);
        $('#homePageMeals').html('');
        $('#innerLoadingScreen').fadeIn(0);
        let categories = await this.fetchCategories();
        ui.displayCategories(categories);
        this.setupCategories(categories);
        $('#innerLoadingScreen').fadeOut(300);
    }

    setupCategories(categories){
        let allCategories = document.querySelectorAll('.category');
        for(let i = 0 ; i < allCategories.length ; i++){
            allCategories[i].addEventListener('click',async (e) => {
                $('#innerLoadingScreen').fadeIn(0);
                let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories[i].strCategory}`);
                let { meals } = await response.json();
                // console.log(meals);
                ui.displayRecipes(meals);
                this.setupMeals(meals);
                $('#innerLoadingScreen').fadeOut(300);
            });
        }
    }

    async fetchCategories(){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let { categories } = await response.json();
        // console.log(categories);
        return categories;
    }


    async fetchRecipes(api){
        try{
            let response = await fetch(api);
            let { meals } = await response.json();
            ui.displayRecipes(meals);
            $('#loadingScreen').fadeOut(500);
            $('body').toggleClass('overflow-y-hidden');
            return meals;
        }catch(error){
            console.log(error);
        }
    }

    sideBarAction(){
        $('#asideLinks').animate({width: 'toggle', paddingInline: 'toggle'},600);
        $('#sidebarBtn i').toggleClass('fa-align-justify fa-x');
        if($('#sidebarBtn i').hasClass('fa-align-justify')){ // clue that the sidebar will be closed
            $('#asideLinks ul li').animate({top: '196px'},600); // hide links
        }
        else{ // sidebar will open
            $('#asideLinks ul li').animate({top: '0'},600); // show links
        }
    }

    setupMeals(meals){
        let allMeals = document.querySelectorAll('.meal');
        for(let i = 0 ; i < allMeals.length ; i++){
            allMeals[i].addEventListener('click',(e) => {
                new MealDetails(meals[i].idMeal);
                if(!$('#sidebarBtn i').hasClass('fa-align-justify')) // if the sidebar is open then close it
                    this.sideBarAction();
            });
        }
    }


    searchLink(){
        this.sideBarAction();
        $('#searchByName').val('');
        $('#searchByFirstLetter').val('');
        $('#searchInputs').fadeIn(0);
        $('#detailsSection').fadeOut(0);
        $('#contactUsSection').fadeOut(0);
        $('#mealsSection').fadeIn(0);
        $('#homePageMeals').html('');
    }

    async search(byNameOrFirstLetter){
        if(!$('#sidebarBtn i').hasClass('fa-align-justify')) // if the sidebar is open then close it
            this.sideBarAction();
        $('#innerLoadingScreen').fadeIn(200);
        let meals = '';
        if(byNameOrFirstLetter == 'searchByName'){
            meals = await this.fetchByName($('#searchByName').val());
        }
        else if(byNameOrFirstLetter == 'searchByFirstLetter'){
            meals = await this.fetchByFirstLetter($('#searchByFirstLetter').val() || 'a'); // if no input letter => set 'a' as a default letter
        }
        let location = document.getElementById('homePageMeals');
        if(meals){
            ui.displayRecipes(meals,location);
            this.setupMeals(meals);
        }
        else{
            location.innerHTML = `<h2 class="text-4xl text-center text-white">No Results Found</h2>`
        }
        $('#innerLoadingScreen').fadeOut(100);
    }

    async fetchByName(mealName){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        let { meals } = await response.json();
        return meals;
    }

    async fetchByFirstLetter(_1stLetter){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${_1stLetter}`);
        let { meals } = await response.json();
        return meals;
    }
};

let settings = new Settings();



// shorten code:
// -------------

// async searchName(){
    //     $('#innerLoadingScreen').fadeIn(200);
    //     let meals = await this.fetchByName($('#searchByName').val());
    //     let location = document.getElementById('homePageMeals');
    //     if(meals){
    //         ui.displayRecipes(meals,location);
    //         this.setupMeals(meals);
    //     }
    //     else{
    //         location.innerHTML = `<h2 class="text-4xl text-center text-white">No Results Found</h2>`
    //     }
    //     $('#innerLoadingScreen').fadeOut(100);
// }

// async searchFirstLetter(){
    //     $('#innerLoadingScreen').fadeIn(200);
    //     let meals = await this.fetchByFirstLetter($('#searchByFirstLetter').val() || 'a');
    //     let location = document.getElementById('homePageMeals');
    //     if(meals){
    //         ui.displayRecipes(meals,location);
    //         this.setupMeals(meals);
    //     }
    //     else{
    //         location.innerHTML = `<h2 class="text-4xl text-center text-white">No Results Found</h2>`
    //     }
    //     $('#innerLoadingScreen').fadeOut(100);
// }

// >> search

// -----------------------

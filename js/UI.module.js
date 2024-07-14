
export class UI{
    constructor(){
        this.location = document.getElementById('homePageMeals');
    }

    displayRecipes(listOfRecipes){
        let box = ``;
        for(let recipe of listOfRecipes){
            box += `
                <div class="meal w-full md:w-3/12 p-3 cursor-pointer">
                    <div class="inner group relative overflow-hidden rounded-xl">
                        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="w-full rounded-xl">
                        <div class="overlay bg-white absolute top-full w-full h-full group-hover:top-0 text-3xl font-semibold flex items-center transition-[top] duration-500 rounded-xl bg-opacity-65">
                            <h3 class="p-2">${recipe.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `
        }
        this.location.innerHTML = box;
    }

    displayCategories(listOfCategories){
        let box = ``;
        for(let category of listOfCategories){
            box += `
                <div class="category w-full md:w-3/12 p-3 cursor-pointer">
                    <div class="inner group relative overflow-hidden rounded-xl">
                        <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-full rounded-xl">
                        <div class="overlay bg-white absolute top-full w-full h-full group-hover:top-0 text-center flex flex-col items-center transition-[top] duration-500 rounded-xl bg-opacity-65">
                            <h3 class="p-2 font-semibold text-xl md:text-3xl">${category.strCategory}</h3>
                            <p>${category.strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
                        </div>
                    </div>
                </div>
            `
        }
        this.location.innerHTML = box;
    }


    displayDetails(mealDetails){
        $('#mealImage').attr('src',mealDetails.strMealThumb);
        $('#mealImage').attr('alt',mealDetails.strMeal);
        $('#mealName').html(mealDetails.strMeal);
        $('#strInstructions').html(mealDetails.strInstructions);
        $('#mealArea').html(mealDetails.strArea);
        $('#mealCategory').html(mealDetails.strCategory);
        let recipeBox = ``;
        let i = 1;
        while(mealDetails[`strIngredient${i}`] && i <= 20){
            let ingredient = mealDetails[`strIngredient${i}`];
            let measure = mealDetails[`strMeasure${i}`];
            recipeBox += `
                <li class="bg-[#cff4fc] border-[#b6effb] p-1.5 m-2 rounded-md">${measure} ${ingredient}</li>
            `
            i++;
        }
        $('#mealRecipes').html(recipeBox);
        let tags = mealDetails.strTags?.split(',');
        if(tags){
            let tagsBox = ``;
            for(let tag of tags){
                if(tag != '') // some has ',' at the last of the string
                    tagsBox += `<li class="bg-[#f8d7da] border-[#f5c2c7] p-1 m-2 rounded-md">${tag}</li>`
            }
            $('#tags').html(tagsBox);
        }
        else{
            $('#tags').html('');
        }

        $('#noSourceOrYoutubeAlert').html('').hide(0);
        $('#youtube').attr('href',mealDetails.strYoutube);
        // because some meals have no youtube link:
        $('#youtube').on('click',(e)=>{
            let href = e.target.href;
            if(!href || href === "null"){
                e.preventDefault();
                $('#noSourceOrYoutubeAlert').html('Sorry, No youtube video found for this meal').show(300);
            }
        });

        $('#source').attr('href',mealDetails.strSource);
        // some meals have no source link as the one called: Pad See Ew
        $('#source').on('click',(e)=>{
            let href = e.target.href;
            if(!href || href === "null"){
                e.preventDefault();
                $('#noSourceOrYoutubeAlert').html('Sorry, No source found for this meal').show(300);
            }
        });
    }

    displayAreas(areas){
        let box = ``;
        for(let area of areas){
            box += `
                <div class="w-full md:w-3/12 text-white text-center mt-6 px-3">
                    <div class="area cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class="text-3xl font-semibold">${area.strArea}</h3>
                    </div>
                </div>
            `
        }
        this.location.innerHTML = box;
    }

    displayIngredients(ingredients){
        let box = ``;
        const loopCount = Math.min(20,ingredients.length);
        for(let i = 0 ; i < loopCount ; i++){
            box += `
                <div class="w-full md:w-3/12 text-white text-center mt-6 px-3 self-start">
                    <div class="ingredient cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class="text-3xl font-semibold">${ingredients[i].strIngredient}</h3>
                        <p class="line-clamp-3">${ingredients[i].strDescription?.split(' ').slice(0,20).join(' ')}</p>
                    </div>
                </div>
            `
        }
        this.location.innerHTML = box;
    }


};

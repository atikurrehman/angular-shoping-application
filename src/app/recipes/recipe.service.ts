import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../share/ingredient.model';
import { ShopingListService } from '../shoping-list/shoping-list.service';
import { Recipe } from './recipe.model';
import * as ShopingListActions from '../shoping-list/store/shoping-list.action';
@Injectable()
export class RecipeService {
    constructor(private shopingListService: ShopingListService, private store: Store<{ shopingList: { ingredients: Ingredient[] } }>) { }
    recipechangeEvent = new Subject<Recipe[]>();
    // private recipes: Recipe[] = [
    // new Recipe('Burger', 'big fate Burger!',
    //     'https://thumbs.dreamstime.com/z/indian-dal-traditional-indian-soup-lentils-indian-dal-food-traditional-indian-soup-lentils-indian-dhal-spicy-curry-bowl-indian-139348337.jpg',
    //     [
    //         new Ingredient('burger', 1),
    //         new Ingredient('frenchfired', 20)
    //     ]),
    // new Recipe('Mution', 'big fate kima!',
    //     'https://thumbs.dreamstime.com/z/indian-dal-traditional-indian-soup-lentils-indian-dal-food-traditional-indian-soup-lentils-indian-dhal-spicy-curry-bowl-indian-139348337.jpg',
    //     [
    //         new Ingredient('muttion', 2),
    //         new Ingredient('buns', 12)
    //     ])
    // ];
    private recipes: Recipe[] = [];
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipechangeEvent.next(this.recipes.slice());
    }
    getRecipe(index: number) {
        return this.recipes[index];
    }
    getRecipes() {
        return this.recipes.slice();
    }
    addIngredientToShopingList(ingredients: Ingredient[]) {
        //  this.shopingListService.addIngredients(ingredients);
        this.store.dispatch(new ShopingListActions.AddIngredients(ingredients));
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipechangeEvent.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipechangeEvent.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipechangeEvent.next(this.recipes.slice());

    }
}
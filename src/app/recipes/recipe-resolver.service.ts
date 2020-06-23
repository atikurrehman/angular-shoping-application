import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../share/dataStorageService';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: "root"
})
export class RevipeResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0)
            return this.dataStorageService.fetchRecipes();
        else
            return recipes;
    }
}
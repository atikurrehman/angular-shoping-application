import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaust, exhaustMap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private baseUrl = 'https://hexaappbackend.firebaseio.com/';
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    saveRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put(this.baseUrl + 'recipes.json', recipes).subscribe(response => {
            console.log('recipes saved!!')
        });
    }
    fetchRecipes() {
        //take oprater unscribe after geting number of response pass in it like here 1
        //exhaustMap replase current suscribtion and replase it with its suscription
        //  return  this.authService.userSubject.pipe(take(1), exhaustMap(user => {
        //     return this.http.get<Recipe[]>(this.baseUrl + 'recipes.json',{
        //        params:new HttpParams().append('auth',user.token)
        //   });}))
        // the above part we have put in intercepter so can handel all request at once
        return this.http.get<Recipe[]>(this.baseUrl + 'recipes.json').pipe(map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            }

            );
        }), tap(response => {
            this.recipeService.setRecipes(response);
            console.log('recipes fetch!!!!');

        }));
    }

}
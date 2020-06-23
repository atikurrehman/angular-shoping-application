import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  recipes: Recipe[];
  constructor(private recipeService: RecipeService) { }
recipeSubcription:Subscription;
  ngOnInit() {
    this.recipes=this.recipeService.getRecipes();
    this.recipeSubcription=  this.recipeService.recipechangeEvent.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;

    });
  }
  ngOnDestroy(){
this.recipeSubcription.unsubscribe();
  }


}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(private route: Router, private recipeService: RecipeService) { }

  ngOnInit() {
  }
  // onRecipeSelect() {
  //     this.recipeService.recipeSelected.emit(this.recipe);

  // }
}
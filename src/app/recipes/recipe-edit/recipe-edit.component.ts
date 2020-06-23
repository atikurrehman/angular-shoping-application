import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipe: Recipe;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private recipeSerivice: RecipeService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

  }
  private initForm() {
    let recipeName = '';
    let recipedescription = '';
    let recipeImagePath = '';
    let recipeIngridents = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeSerivice.getRecipe(this.id);
      recipeName = recipe.name;
      recipedescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngridents.push(new FormGroup({
            name: new FormControl(ingredient.name, [Validators.required]),
            amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
          }));
        }
      }


    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(recipeImagePath, [Validators.required]),
      description: new FormControl(recipedescription, [Validators.required]),
      ingredients: recipeIngridents
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  addIngrident() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])

    }));
  }
  onFormSubmit() {

    // const newRecipe=new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    if (this.editMode) {

      this.recipeSerivice.updateRecipe(this.id, this.recipeForm.value)
    }
    else {
      this.recipeSerivice.addRecipe(this.recipeForm.value);
    }
    this.recipeForm.reset();
    this.editMode = false;
    this.router.navigate(['/recipes']);
  }
  onCancel() {
    // this.recipeForm.reset();
    this.editMode = false;
    // this.router.navigate(['/recipes']);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  // deleteRecipe() {
  //   this.recipeSerivice.deleteRecipe(this.id);
  //   this.router.navigate(['/recipes']);
  // }
}

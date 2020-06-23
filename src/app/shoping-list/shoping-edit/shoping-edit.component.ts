import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/share/ingredient.model';
import { ShopingListService } from '../shoping-list.service';
import { Store } from '@ngrx/store';
import * as ShopingListAction from '../store/shoping-list.action';
import * as fromShopingList from '../store/shoping-list.reducer';


@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  // @ViewChild("nameInput", { static: true }) nameInputRef: ElementRef;
  // @ViewChild("amountInput", { static: true }) amountInputRef: ElementRef;
  @ViewChild("form", { static: false }) form: NgForm;
  onEditItemSusc: Subscription;
  editedItemIndex: number;
  isEditingMode = false;

  constructor(private shopingListService: ShopingListService, private store: Store<fromShopingList.AppState>) { }

  ngOnInit() {
    this.store.select('shopingList').subscribe(stateDate => {
      if (stateDate.editedIngredientIndex > -1) {
        this.isEditingMode = true;
        const ingredient = stateDate.editedIngredient;
        this.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
      }
      else {
        this.isEditingMode = false;
      }

    });
    // this.onEditItemSusc = this.shopingListService.onEditItem.subscribe((index: number) => {
    //   this.editedItemIndex = index;
    //   this.isEditingMode = true;
    //   const ingredient = this.shopingListService.getIngredient(index);
    //   this.form.setValue({
    //     name: ingredient.name,
    //     amount: ingredient.amount
    //   });
    // });
  }
  onAddItem() {
    // console.log(this.form.value);
    // const name = this.nameInputRef.nativeElement.value;
    // const amount = this.amountInputRef.nativeElement.value;
    const formValue = this.form.value;
    const ingredient = new Ingredient(formValue.name, formValue.amount);
    if (this.isEditingMode) {
      // this.shopingListService.updateIngredient(this.editedItemIndex, ingredient);
      this.store.dispatch(new ShopingListAction.UpdateIngredient({ index: this.editedItemIndex, ingredient: ingredient }));
    } else {
      // this.shopingListService.addIngredient(ingredient);
      this.store.dispatch(new ShopingListAction.AddIngredient(ingredient));
    }
    this.isEditingMode = false;
    this.form.reset();
  }
  onDeleteItem() {
    // this.shopingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShopingListAction.DeleteIngredient(this.editedItemIndex));
    this.isEditingMode = false;

    this.form.reset();
  }
  onClearItem() {
    this.isEditingMode = false;
    this.store.dispatch(new ShopingListAction.StopEdit());
    this.form.reset();
  }
  ngOnDestroy() {
    this.onEditItemSusc.unsubscribe();
    this.store.dispatch(new ShopingListAction.StopEdit());
  }
}

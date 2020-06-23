import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Ingredient } from '../share/ingredient.model';
import { ShopingListService } from './shoping-list.service';
import { Store } from '@ngrx/store';
import * as fromShopingList from '../shoping-list/store/shoping-list.reducer';
import * as ShopingListActions from '../shoping-list/store/shoping-list.action';
@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']

})
export class ShopingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // ingredientchangeSucribe: Subscription;
  constructor(private shopingListService: ShopingListService, private router: Router,
    private store: Store<fromShopingList.AppState>) { }


  ngOnInit() {
    this.ingredients = this.store.select('shopingList');
    //as we are using ngrx store to manage state, no eed of below commented code
    // this.ingredients = this.shopingListService.getIngredients();
    // this.ingredientchangeSucribe = this.shopingListService.ingredientchange.subscribe((ingredientList: Ingredient[]) => {
    //   this.ingredients = ingredientList;
    // });
  }
  onEditItem(index: number) {
    //  this.shopingListService.onEditItem.next(index);
    this.store.dispatch(new ShopingListActions.StartEdit(index));
  }
  ngOnDestroy(): void {
    // this.ingredientchangeSucribe.unsubscribe();
    

  }

}

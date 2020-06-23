import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../share/shared.module';
import { ShopingEditComponent } from './shoping-edit/shoping-edit.component';
import { ShopingListRoutingModule } from './shoping-list-routing.module';
import { ShopingListComponent } from './shoping-list.component';

@NgModule({
    declarations: [
        ShopingListComponent,
        ShopingEditComponent,
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        ShopingListRoutingModule
    ]
})
export class ShopingListModule { }
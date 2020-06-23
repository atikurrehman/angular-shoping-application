import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopingListComponent } from '../shoping-list/shoping-list.component';
const routes: Routes = [
    //for using lazzy loading we need to make root path of that module blank as we are using path in App routing file
    { path: '', component: ShopingListComponent }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShopingListRoutingModule {
}
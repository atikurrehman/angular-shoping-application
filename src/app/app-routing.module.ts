import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    //alternative for above way of lazzy loading
    {
        path: 'shoping-list',loadChildren: './shoping-list/shoping-list.module#ShopingListModule'
       // loadChildren: () => import('./shoping-list/shoping-list.module').then(m => { m.ShopingListModule })
    },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}

];
@NgModule({
    imports: [
        RouterModule.forRoot(routes,
            //to pri load all modules in lazzy loading
            {preloadingStrategy:PreloadAllModules}
            )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
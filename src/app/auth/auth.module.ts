import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../share/shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
    declarations: [
        AuthComponent
    ], imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([{ path: '', component: AuthComponent }])
        //for using lazzy loading we need to make root path of that module blank as we are using path in cApp routing file
    ]
})
export class AuthModule {

}
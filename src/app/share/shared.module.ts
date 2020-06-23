import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpainnerComponent } from './loading-spainner/loading-spainner.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DropdownDirective,
        LoadingSpainnerComponent,
        AlertComponent,
        PlaceholderDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule,
        DropdownDirective,
        LoadingSpainnerComponent,
        AlertComponent,
        PlaceholderDirective

    ],
    //only needed if using angular8 and below and creating component in code 
    entryComponents: [
        AlertComponent
    ]
})
export class SharedModule { }
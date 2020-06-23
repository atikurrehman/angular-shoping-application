
import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../share/alert/alert.component';
import { PlaceholderDirective } from '../share/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    isLoginMode = true;
    isLoading = false;
    error = null;
    componentSuc: Subscription;
    @ViewChild(PlaceholderDirective, { static: false }) holder: PlaceholderDirective;
    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
    }
    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }
    swithMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    onFormSubmit() {
        const value = this.loginForm.value;
        console.log(value);
        this.isLoading = true;
        let authObservable: Observable<AuthResponseData>;
        if (this.isLoginMode) {
            authObservable = this.authService.login(value.email, value.password);

        } else {
            authObservable = this.authService.signup(value.email, value.password);
            this.isLoginMode = !this.isLoginMode;
        }
        authObservable.subscribe(authResponse => {
            console.log(authResponse);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, error => {
            console.log(error);
            this.error = error;
            this.showAlertError();
            this.isLoading = false;
        });

        this.loginForm.reset();

    }
    onHandelError() {
        this.error = null;
    }
    private showAlertError() {
        const alertComponentFctory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const viewContainerRef = this.holder.viewContenerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(alertComponentFctory);
        componentRef.instance.message = this.error;
        this.componentSuc = componentRef.instance.closed.subscribe(() => {
            this.componentSuc.unsubscribe();
            viewContainerRef.clear();
        });

    }
    ngOnDestroy() {
        if (this.componentSuc)
            this.componentSuc.unsubscribe();
    }

}
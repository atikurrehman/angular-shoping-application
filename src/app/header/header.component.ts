import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../share/dataStorageService';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-headr',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    userSus: Subscription;
    isAuthenticated = false;
    constructor(private datatoregService: DataStorageService, private authService: AuthService) { }
    // @Output() featureEmitted = new EventEmitter<string>();
    // onSelect(feature: string) {
    //     this.featureEmitted.emit(feature);
    // }
    ngOnInit() {
        this.userSus = this.authService.userSubject.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }
    ngOnDestroy() {
        this.userSus.unsubscribe();

    }
    onSaveRecipes() {
        this.datatoregService.saveRecipes();
    }
    onFetchRecipes() {
        this.datatoregService.fetchRecipes().subscribe();
    }
    onLogout(){
        this.authService.logout();
    }
}
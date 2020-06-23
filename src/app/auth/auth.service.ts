import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import {environment} from '../../environments/environment';
export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    //its provide priuse value if fetch before emmeting next value
    userSubject = new BehaviorSubject<User>(null);
    logoutTimer: any;
    constructor(private http: HttpClient, private router: Router) { }
    private handleError(errorRes: HttpErrorResponse) {
        console.log(errorRes);
        let errorMessage = 'Unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email is already in use!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email is not found!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Entered Password is wrong!';
                break;
            case 'USER_DISABLED':
                errorMessage = 'User is dissabled please contact admin!';
                break;
        }
        return throwError(errorMessage);


    }
    private authData(responseData: AuthResponseData) {

        const expireDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
        const user = new User(responseData.email, responseData.localId, responseData.idToken, expireDate);
        this.userSubject.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(+responseData.expiresIn * 1000);

    }
    autoLogin() {
        const storedUser = <{
            _token: string; email: string; _tokenExpireDate: string; id: string;
        }>JSON.parse(localStorage.getItem('userData'));
        if (!storedUser) { return }
        const user = new User(storedUser.email, storedUser.id,
            storedUser._token, new Date(storedUser._tokenExpireDate));
            console.log(user);
        this.userSubject.next(user);
        const timeout=new Date(storedUser._tokenExpireDate).getTime()-new Date().getTime()
        this.autoLogout(timeout);

    }
    autoLogout(expirationDuration: number) {
        this.logoutTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    signup(userEmail: string, userPassword: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.fireBaseProjectKey,
            {
                email: userEmail,
                password: userPassword,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(res => { this.authData(res) }));
    }

    login(userEmail: string, userPassword: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.fireBaseProjectKey,
            {
                email: userEmail,
                password: userPassword,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(res => { this.authData(res) }));
    }
    logout() {
        this.userSubject.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
        }
        this.logoutTimer = null;

    }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(private authSerivce: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, status: RouterStateSnapshot)
        : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authSerivce.userSubject.pipe(take(1), map(user => {
            const auth = !!user;
            if (auth)
                return true;
            else
                return this.router.createUrlTree(['/auth']);
        })
            // , tap(isAuth => {
            //     if (!isAuth)
            //         this.router.navigate(['/auth']);
            // })
        );
    }
}
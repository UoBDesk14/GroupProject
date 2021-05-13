import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {CommonApiService} from '../service/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: CommonApiService, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  canActivate() {
    const token = localStorage.getItem('token') || '';
    if (!token) {
      this.router.navigate(['login']);
    }
    return true;
  }
}

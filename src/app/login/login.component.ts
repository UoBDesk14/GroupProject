import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CommonApiService} from 'src/app/service/common-api.service';
import {AuthService} from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriber!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private commonApiService: CommonApiService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.subscriber = this.route.url.subscribe((urls) =>
      // @ts-ignore
      this.authService.canGoto(urls[0].path)
    );
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
    // @ts-ignore
    this.authService.canGoto('');
  }

  onLogin(form: NgForm) {
    // @ts-ignore
    this.commonApiService.login(form.value.username, form.value.password)
      // @ts-ignore
      .subscribe((res) => {
        if (res.token) {
          // @ts-ignore
          this.commonApiService.setTokenAndUserName(res.token, res.username);
          this.router.navigate(['']);
        } else if (res.message === 'Incorrect password') {
          alert('Incorrect password');
        } else {
          alert('Incorrect username');
        }
      });
  }
  goRegister(): void {
    this.router.navigate(['signup']);
  }
}

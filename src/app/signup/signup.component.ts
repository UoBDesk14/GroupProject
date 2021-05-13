import {Route} from '@angular/compiler/src/core';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CommonApiService} from 'src/app/service/common-api.service';
import {AuthService} from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  private subscriber!: Subscription;


  constructor(
    private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
    private commonApiService: CommonApiService
  ) {
  }

  ngOnInit(): void {
    this.subscriber = this.router.url.subscribe((urls) => {
      // @ts-ignore
      this.authService.canGoto(urls[0].path);
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
    // @ts-ignore
    this.authService.canGoto('');
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    } else if (form.value.password != form.value.passAuth) {
      alert('passwords do not match');
      return;
    }
    // @ts-ignore
    this.commonApiService
      .register(form.value.username, form.value.password)
      // @ts-ignore
      .subscribe((res) => {
        // @ts-ignore
        if (res.status === 1) {
          alert('Register Successful');
          this.route.navigate(['login']);
        } else {
          alert('Username is taken');
        }
      });
  }
}

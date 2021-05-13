import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AuthGuard} from './provider/guard.provider';
import {ListComponent} from './list/list.component';
import {PostComponent} from './post/post.component';
import {DetailComponent} from './detail/detail.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'login', component: LoginComponent,},
  {path: 'signup', component: SignupComponent,},
  {path: 'post', component: PostComponent, canActivate: [AuthGuard]},
  {path: 'detail', component: DetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {
}

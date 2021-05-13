import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {CommonApiService} from './service/common-api.service';
import {AuthService} from './service/auth.service';
import {ListComponent} from './list/list.component';
import {HeaderComponent} from './header/header.component';
import {PostComponent} from './post/post.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ListComponent,
    HeaderComponent,
    PostComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CommonApiService,
    AuthService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ListComponent],
})
export class AppModule {
}

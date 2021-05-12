import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/Toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {LoginComponent} from './authentication/login/login.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {AuthenticationService} from './service/authentication.service';
import {UrlStateService} from './service/url-state.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {ListComponent} from './list/list.component';
import {HeaderComponent} from './header/header.component';
import {PostComponent} from './post/post.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DetailComponent } from './detail/detail.component';


const material = [
  BrowserAnimationsModule,
  MatInputModule,
  MatButtonModule,
  MatPaginatorModule,
  FormsModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSliderModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatExpansionModule,
  NgxSliderModule
];

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
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...material,
  ],
  providers: [
    AuthenticationService,
    UrlStateService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ListComponent],
})
export class AppModule {
}

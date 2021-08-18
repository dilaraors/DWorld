import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BlogPostsComponent } from './views/blog-posts/blog-posts.component';
import { BlogPostComponent } from './views/blog-post/blog-post.component';
import { BlogPostService } from './services/blog-post/blog-post.service';
import { BlogPostAddEditComponent } from './views/blog-post-add-edit/blog-post-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { IyziPayService } from './services/iyzi-pay/iyzi-pay.service';
import { IyziPayComponent } from './views/iyzi-pay/iyzi-pay.component';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './views/home-page/home-page.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { LoginComponent } from './views/admin/login/login.component';
import { RegisterComponent } from './views/admin/register/register.component';
import { ForgotPasswordComponent } from './views/admin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './views/admin/verify-email/verify-email.component';
import { AuthService } from './services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { SavedLikedPostsComponent } from './views/saved-liked-posts/saved-liked-posts.component';
import { PostsByTypeComponent } from './views/common/posts-by-type/posts-by-type.component';
import { TravelPageComponent } from './views/travel-page/travel-page.component';
import { FoodPageComponent } from './views/food-page/food-page.component';

var config: FirebaseAppConfig = {
  apiKey: "AIzaSyBwbf8OfR7gD5fwq7dpVbB9o4AL9imuv10",
    authDomain: "d-world-299713.firebaseapp.com",
    projectId: "d-world-299713",
    storageBucket: "d-world-299713.appspot.com",
    messagingSenderId: "602559934187",
    appId: "1:602559934187:web:a6b5524755818084f5d8ae",
    measurementId: "G-JT03JM8SY3"
};
@NgModule({
  declarations: [
    AppComponent,
    BlogPostsComponent,
    BlogPostComponent,
    BlogPostAddEditComponent,
    IyziPayComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    UserComponent,
    SavedLikedPostsComponent,
    PostsByTypeComponent,
    TravelPageComponent,
    FoodPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule,
    YouTubePlayerModule,
    AngularFireModule.initializeApp(config)
  ],
  entryComponents: [LoginPageComponent, RegisterPageComponent],
  providers: [
    BlogPostService,
    IyziPayService,
    AuthenticationService,
    AuthService,
    AuthInterceptor,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

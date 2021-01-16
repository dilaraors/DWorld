import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogPostsComponent,
    BlogPostComponent,
    BlogPostAddEditComponent,
    IyziPayComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    BlogPostService,
    IyziPayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

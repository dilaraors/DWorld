import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPostComponent } from './views/blog-post/blog-post.component';
import { BlogPostAddEditComponent } from './views/blog-post-add-edit/blog-post-add-edit.component';
import { IyziPayComponent } from './views/iyzi-pay/iyzi-pay.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { BlogPostsComponent } from './views/blog-posts/blog-posts.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';
import { LoginComponent } from './views/admin/login/login.component';
import { RegisterComponent } from './views/admin/register/register.component';
import { ForgotPasswordComponent } from './views/admin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './views/admin/verify-email/verify-email.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './views/user/user.component';
import { SavedLikedPostsComponent } from './views/saved-liked-posts/saved-liked-posts.component';
import { TravelPageComponent } from './views/travel-page/travel-page.component';
import { FoodPageComponent } from './views/food-page/food-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'blogposts', component: BlogPostsComponent},
  { path: 'blogpost-by-type/:type', component: SavedLikedPostsComponent},
  { path: 'travel/:sectionId', component: TravelPageComponent},
  { path: 'food/:sectionId', component: FoodPageComponent},
  { path: 'blogpost/:id', component: BlogPostComponent },
  { path: 'iyzipay', component: IyziPayComponent },
  { path: 'add', component: BlogPostAddEditComponent },
  { path: 'blogpost/edit/:id', component: BlogPostAddEditComponent },
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'auth-login', component: LoginComponent},//firebase
  { path: 'auth-register', component: RegisterComponent},//firebase
  { path: 'user', component: UserComponent},
  { path: '**', redirectTo: '/' },
  { path: '**', redirectTo: '/' },
  {
    path:  'admin',
    children: [
        // [...]
        { path:  'login-auth',component:  LoginComponent, pathMatch: 'full'},
        { path:  'register-auth', component:  RegisterComponent, pathMatch: 'full' },
        { path:  'forgot-password', component:  ForgotPasswordComponent },
        { path:  'verify-email', component:  VerifyEmailComponent }
    ]
    }
];

@NgModule({
  imports: [ 
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
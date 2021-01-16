import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPostComponent } from './views/blog-post/blog-post.component';
import { BlogPostAddEditComponent } from './views/blog-post-add-edit/blog-post-add-edit.component';
import { IyziPayComponent } from './views/iyzi-pay/iyzi-pay.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { BlogPostsComponent } from './views/blog-posts/blog-posts.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'blogposts', component: BlogPostsComponent},
  { path: 'blogpost/:id', component: BlogPostComponent },
  { path: 'iyzipay', component: IyziPayComponent },
  { path: 'add', component: BlogPostAddEditComponent },
  { path: 'blogpost/edit/:id', component: BlogPostAddEditComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
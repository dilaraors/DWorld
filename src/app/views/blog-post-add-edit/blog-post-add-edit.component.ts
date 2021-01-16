import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from 'src/app/models/blog-post.model';
import { BlogPostService } from 'src/app/services/blog-post/blog-post.service';

@Component({
  selector: 'app-blog-post-add-edit',
  templateUrl: './blog-post-add-edit.component.html',
  styleUrls: ['./blog-post-add-edit.component.css']
})
export class BlogPostAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  formId: string;
  postId: number;
  errorMessage: any;
  existingBlogPost: BlogPost;
  constructor(private blogPostService: BlogPostService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formId= 'id';
    this.formTitle = 'title';
    this.formBody = 'body';
    if (this.avRoute.snapshot.params[idParam]) {
      this.postId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
      }
    )
  }

  ngOnInit(): void {
    if (this.postId > 0) {
      this.actionType = 'Edit';
      this.blogPostService.getBlogPost(this.postId)
        .subscribe(data => {
          this.existingBlogPost = data["result"];
          this.form.controls[this.formId].setValue(data["result"].id);
          this.form.controls[this.formTitle].setValue(data["result"].title);
          this.form.controls[this.formBody].setValue(data["result"].body);
        }
        );
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let blogPost = {
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };

      this.blogPostService.addBlogPost(blogPost)
        .subscribe((data) => {
          debugger;
          this.router.navigate(['/blogposts']);
        });
    }

    if (this.actionType === 'Edit') {
      debugger;
      let blogPost= {
        id: this.form.get(this.formId).value,
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };
      this.blogPostService.updateBlogPost(blogPost)
        .subscribe((data) => {
          this.router.navigate(['/blogposts']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get body() { return this.form.get(this.formBody); }

}

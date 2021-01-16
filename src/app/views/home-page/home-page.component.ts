import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/app/services/blog-post/blog-post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  blogPosts;
  imgSrcs;

  constructor(private blogPostService: BlogPostService) {}

  ngOnInit() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.blogPostService
      .getBlogPost(0)
      .subscribe((data) => (this.imgSrcs = data['result'].homePageImages));
    this.blogPostService.getBlogPosts().subscribe((data) => {
      this.blogPosts = data['result'];
      debugger;
    });
  }
}

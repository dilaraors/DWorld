import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/app/services/blog-post/blog-post.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {
  blogPosts;

  constructor(private blogPostService: BlogPostService) {
  }
  ngOnInit() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
     this.blogPostService.getBlogPosts().subscribe(data => {
       this.blogPosts = data["result"];
      });
  }

  delete(postId) {
    const ans = confirm('Do you want to delete blog post with id: ' + postId);
    if (ans) {
      this.blogPostService.deleteBlogPost(postId).subscribe((data) => {
        this.loadBlogPosts();
      });
    }
  }
}

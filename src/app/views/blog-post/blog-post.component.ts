import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from 'src/app/services/blog-post/blog-post.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  blogPost;
  postId : number;
  images;
  url: SafeResourceUrl;
  constructor(private blogPostService: BlogPostService, private acRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
    const idParam = 'id';
    if(this.acRoute.snapshot.params[idParam]){
      this.postId = this.acRoute.snapshot.params[idParam];
    }
   }

  ngOnInit(): void {
    this.loadBlogPost();
  }
  
  loadBlogPost(){
    this.blogPostService.getBlogPost(this.postId).subscribe(data => {
      console.log("data", data);
      this.blogPost = data["result"];
      this.images = data["result"].imageGallery;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(data["result"].youTubeVideoURL);
    });
  }
}

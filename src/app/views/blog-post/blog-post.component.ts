import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BlogPostType } from 'src/app/enums/blog-post-type';
import { BlogPostService } from 'src/app/services/blog-post/blog-post.service';
import { UserBlogPostService } from 'src/app/services/user-blog-post/user-blog-post.service';

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
  heart;
  post;

  constructor(private blogPostService: BlogPostService, private userBlogPostService: UserBlogPostService, private acRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
    const idParam = 'id';
    if(this.acRoute.snapshot.params[idParam]){
      this.postId = this.acRoute.snapshot.params[idParam];
    }
   }

  ngOnInit(): void {
    this.heart = document.getElementById('like-button');
    this.post = document.getElementById('save-button');
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

  likedPost(postId){
    debugger;
    this.heart.classList.toggle('likedHeart');
    var model = {
      "BlogPostId":postId,
      "Type": BlogPostType.Liked
    };
    this.userBlogPostService.addByType(model).subscribe(data => {
      console.log(data);
    });
  }

  savedPost(){
    this.post.classList.toggle('savedPost');
  }
}

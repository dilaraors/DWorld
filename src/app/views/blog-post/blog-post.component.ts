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
  videoId;
  heart;
  post;

  constructor(private blogPostService: BlogPostService, private userBlogPostService: UserBlogPostService,
     private acRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
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
      debugger;
      this.videoId = data["result"].youTubeVideoURL.split("watch?v=")[1];
      this.videoId = this.videoId.split("&")[0];
      let videoUrl = 'https://www.youtube.com/embed/'+this.videoId;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
      this.GetBlogPostByTypeExistence(BlogPostType.Liked, data["result"].id);
      this.GetBlogPostByTypeExistence(BlogPostType.Saved, data["result"].id);
    });
  }

  GetBlogPostByTypeExistence(type, postId){
    var model = {
      "BlogPostId":postId,
      "Type": type
    };
    this.userBlogPostService.getBlogPostByTypeExistence(model).subscribe(data => {
      if(type == BlogPostType.Liked){
        data.result ? this.heart.classList.replace('normalHeart','likedHeart') : this.heart.classList.replace('likedHeart', 'normalHeart');
      }else{
        data.result ? this.post.classList.replace('normalSave','savedPost') : this.post.classList.replace('savedPost', 'normalSave');
       }
      })
  }

  likedSavedPost(postId, type){
    var model = {
      "BlogPostId":postId,
      "Type": type == "like" ? BlogPostType.Liked : BlogPostType.Saved
    };
    this.userBlogPostService.getBlogPostByTypeExistence(model).subscribe(data => {
      if(type == 'like'){
        if(data.result && this.heart.classList[2]=="likedHeart"){
          this.userBlogPostService.deleteByType(model).subscribe(() => {
            this.heart.classList.replace('likedHeart', 'normalHeart')
          });
        }else if(data.result && this.post.classList[2]=="normalHeart"){
          this.userBlogPostService.addByType(model).subscribe(() => {
            this.heart.classList.replace('normalHeart', 'likedHeart');
          });
        }else if(!data.result && this.heart.classList[2]=="normalHeart")
          this.userBlogPostService.addByType(model).subscribe(() => {
            this.heart.classList.replace('normalHeart', 'likedHeart');
          });
      }else if('save'){
         if(data.result && this.post.classList[2]=="savedPost"){
          this.userBlogPostService.deleteByType(model).subscribe(() => {
            this.post.classList.replace('savedPost', 'normalSave');
          });
        }else if(data.result && this.post.classList[2]=="normalSave"){
          this.userBlogPostService.addByType(model).subscribe(() => {
            this.heart.classList.replace('normalSave', 'savedPost');
          });
        }
        else if(!data.result && this.post.classList[2]=="normalSave")
          this.userBlogPostService.addByType(model).subscribe(() => {
            this.heart.classList.replace('normalSave', 'savedPost');
          });
      }
      location.reload();
    });
  }
}

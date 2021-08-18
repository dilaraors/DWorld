import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { BlogPostService } from 'src/app/services/blog-post/blog-post.service';
import { UserBlogPostService } from 'src/app/services/user-blog-post/user-blog-post.service';

@Component({
  selector: 'app-posts-by-type',
  templateUrl: './posts-by-type.component.html',
  styleUrls: ['./posts-by-type.component.css']
})
export class PostsByTypeComponent implements OnInit {

  @Input() type;
  @Input() sectionId;
  @Input() topicName;
  blogPosts;
  constructor(private userBlogService: UserBlogPostService, private blogService: BlogPostService) { }

  ngOnInit(): void {
    if (this.type) {
      this.userBlogService.getBlogPostsByType(this.type).subscribe(data => {
        this.blogPosts = data["result"];
      });
    }
    this.getBySection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes != null) {
      console.log(changes);
      this.getBySection();
      // here you will get the updated data when ever you click the sendComment button on feeds 
    }
  }

  getBySection() {
    if (this.sectionId && this.topicName) {
      let model = {
        "sectionId": parseInt(this.sectionId),
        "topicName": this.topicName
      }
      this.blogService.getBlogPostBySection(model).subscribe(data => {
        this.blogPosts = data["result"];
      });
    }
    else if (this.sectionId) {
      let model = {
        "sectionId": parseInt(this.sectionId)
      }
      this.blogService.getBlogPostBySection(model).subscribe(data => {
        this.blogPosts = data["result"];
      });
    }

  }
}

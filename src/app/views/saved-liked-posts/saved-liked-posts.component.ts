import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-saved-liked-posts',
  templateUrl: './saved-liked-posts.component.html',
  styleUrls: ['./saved-liked-posts.component.css']
})
export class SavedLikedPostsComponent implements OnInit {

  blogPosts;
  postType;
  header;
  constructor(private acRoute: ActivatedRoute, private router: Router) {
    const typeParam = 'type';
    if(this.acRoute.snapshot.params[typeParam]){
      this.postType = this.acRoute.snapshot.params[typeParam];
    }
   }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      switch(this.postType){
        case "1":{
          this.header = "Commented";
          break;
        }
        case "2":{
          this.header = "Liked";
          break;
        }
        case "3":{
          this.header = "Saved";
          break;
        }
      }
  }

}

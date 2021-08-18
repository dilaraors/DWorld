import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  sectionId;
  topicName;
  constructor(private acRoute: ActivatedRoute) {
    const sectionIdParam = 'sectionId';
    if(this.acRoute.snapshot.params[sectionIdParam]){
      this.sectionId = this.acRoute.snapshot.params[sectionIdParam];
    }
   }

  ngOnInit(): void {
  }

  getByTopic(name){
    this.topicName = name;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-travel-page',
  templateUrl: './travel-page.component.html',
  styleUrls: ['./travel-page.component.css']
})
export class TravelPageComponent implements OnInit {

  sectionId;
  constructor(private acRoute: ActivatedRoute) {
    const sectionIdParam = 'sectionId';
    if(this.acRoute.snapshot.params[sectionIdParam]){
      this.sectionId = this.acRoute.snapshot.params[sectionIdParam];
    }
   }

  ngOnInit(): void {
  }
}

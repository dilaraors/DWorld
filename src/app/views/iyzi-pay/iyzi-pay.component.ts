import { Component, OnInit } from '@angular/core';
import { IyziPayService } from 'src/app/services/iyzi-pay/iyzi-pay.service';

@Component({
  selector: 'app-iyzi-pay',
  templateUrl: './iyzi-pay.component.html',
  styleUrls: ['./iyzi-pay.component.css']
})
export class IyziPayComponent implements OnInit {

  constructor(private iyziPayService: IyziPayService) {
  }

  contentUrl = null;
  pageUrl = null;

  ngOnInit(): void {
    this.getIyzipayContent();

  }

  goToLink() {
    window.open(this.pageUrl);
  }
  getIyzipayContent() {
    this.iyziPayService.getIyziPayContent().subscribe((res) => {
      console.log("initialize", res);
      this.contentUrl = res["data"]["checkoutFormContent"];
      res["data"]["paymentPageUrl"] = res["data"]["paymentPageUrl"] + "&iframe=true";
      this.pageUrl = res["data"]["paymentPageUrl"];
      console.log(this.contentUrl + '<div id="iyzipay-checkout-form" class="responsive"></div>');
    });

    return this.contentUrl;
  }
}

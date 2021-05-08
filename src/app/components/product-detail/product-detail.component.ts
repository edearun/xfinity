import { Component, OnInit } from '@angular/core';
import {ProductDetailService} from '../../services/product-detail.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private productDetailService:ProductDetailService,
    private router:Router,
    private activateRoute:ActivatedRoute) { }

    selectedSlug;
    productDetail;
    imagesIndex = 0;
    imagesList = []
    deviceColor ;
    deviceCapacity;
    availableFor;
    originalPrice;
    originalLoanPrice;
    promotionLoanPrice;
    term;
    currencyString;
    deviceBrand = "";
    deviceName = "";
    is5GCapable = false;
  ngOnInit(): void {

    this.activateRoute.params.subscribe(param =>{
      this.selectedSlug = param['slug']
    });
    this.productDetailService.fetchProductDetailBySlug(this.selectedSlug).subscribe((data)=>{
      this.productDetail = data[0];

      this.addingImages(0);
      this.settingDeviceData(0);
    });
  }
  settingDeviceData(index){
    this.deviceColor = this.productDetail.variants[index].color.name;
    this.deviceCapacity = this.productDetail.variants[index].capacity;
    this.availableFor = this.productDetail.variants[index].status;
    this.originalPrice = this.productDetail.variants[index].prices[0].originalPrice;
    this.originalLoanPrice = this.productDetail.variants[index].prices[1].originalPrice;
    this.promotionLoanPrice = this.productDetail.variants[index].prices[1].promotionPrice;
    this.term = this.productDetail.variants[index].prices[1].term;
    this.currencyString = this.productDetail.variants[index].currencyString;
    this.deviceBrand = this.productDetail.brand;
    this.deviceName =  this.productDetail.name;
    this.is5GCapable = this.productDetail.is5GCapable;

  }
  addingImages(index){
    this.imagesList = [];
    this.imagesList.push(this.productDetail.variants[index].images.primary.url);
    this.imagesList.push(this.productDetail.variants[index].images.hero.url);
    if(this.productDetail.variants[index].images.alternate.length >= 2){
      this.imagesList.push(this.productDetail.variants[index].images.alternate[0].url);
      this.imagesList.push(this.productDetail.variants[index].images.alternate[1].url);
    }

  }
  nextImage(){
    if(this.imagesList.length - 1 === this.imagesIndex) {
      this.imagesIndex = 0;
    } else {
      this.imagesIndex = this.imagesIndex + 1;
    }

  }
  previousImage(){
    if(this.imagesIndex === 0 ){
      this.imagesIndex = this.imagesList.length - 1;
    } else {
      this.imagesIndex = this.imagesIndex - 1;
    }

  }
  changeImage(index){

    this.imagesIndex = index;
  }
}

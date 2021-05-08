import { Component, OnInit } from '@angular/core';
    
import { ProductDetailService } from '../../services/product-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private productDetailService:ProductDetailService,
    private router:Router) { }
  
  productDetails = []
  selectedCategory="DEVICE";
  applyButton = false;

  ngOnInit(): void {
    this.fetchListOfProducts();
  }
  fetchListOfProducts(){

    this.productDetailService.fetchProductDetails(this.selectedCategory).subscribe((data)=>{
      this.productDetails = data.products;

    });
  }
  showDetails(){
      this.router.navigate(['productDetail/'+this.productDetails[0].slug])
  }
  categoryChange(event){

    this.selectedCategory = event.target.value;
    this.applyButton = true;
  }
  applyFilter(){

    this.applyButton = false;
    this.fetchListOfProducts();
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  constructor(private http:HttpClient) { }


  fetchProductDetails(selectedCategory) : Observable <any>  {
    console.log(selectedCategory)
    return this.http.get('https://pcat.mobile.xfinity.com/products?category='+selectedCategory+'&limit=24&offset=0');
  }
  fetchProductDetailBySlug(slug) : Observable <any>{
    return this.http.get('https://pcat.mobile.xfinity.com/product/details?slug=' +slug);
  }
}

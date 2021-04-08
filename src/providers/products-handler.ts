import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductSheet } from './productSheets';

@Injectable()
export class ProductsHandler {

  private url = 'https://santaios.gr';
  private consumerKey = 'ck_c87bb8148f824506cdf02c96c690bbc2b23e8d26';
  private consumerSecret = 'cs_e4e285d010e68fd87ad8a85c9f210b0e0e896caa';

  private allProducts: any = [];

  constructor(public http: HttpClient) { }

  public retrieveProducts() {
    this.http.get(
      `${this.url}/wp-json/wc/v3/products?per_page=100&page=1&consumer_key=${
        this.consumerKey
      }&consumer_secret=${this.consumerSecret}`
    ).subscribe(products => {
      this.allProducts = products;

      console.log("ALL PRODUCTS : ", this.allProducts)
    })
  }

  public getProductsByCategory(slug: string): any{
    let productList = [];

    this.allProducts.forEach(prod => {
      prod.categories.forEach(category => {
        if (category.slug == slug) productList.push(prod);
      });
    });
    
    return productList;
  }

}
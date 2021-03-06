import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductSheet } from './productSheets';
// import { resolve } from 'node:path';

@Injectable()
export class ProductsHandler {

  private url = 'https://santaios.gr';
  private consumerKey = 'ck_c87bb8148f824506cdf02c96c690bbc2b23e8d26';
  private consumerSecret = 'cs_e4e285d010e68fd87ad8a85c9f210b0e0e896caa';

  private allProducts: any = [];
  private allProductAttributes: any = [];
  private productsRetrieved: boolean = false;

  constructor(private http: HttpClient) { }

  public getAllProducts() {
    return this.allProducts;
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

  public getAttributeName(id: number): string {
    for (let i = 0; i < this.allProductAttributes.length; i++) {
      if (id == this.allProductAttributes[i].id) return this.allProductAttributes[i].name;
    }
  }

  public retrieveProducts(): Promise<any> {
    let that = this;
    console.log(that.productsRetrieved)
    return new Promise(function(resolve, reject){
      if (!that.productsRetrieved) {
        that.http.get(
          `${that.url}/wp-json/wc/v3/products?per_page=100&page=1&consumer_key=${
            that.consumerKey
          }&consumer_secret=${that.consumerSecret}`
        ).subscribe(products => {
          that.allProducts = products;
          that.productsRetrieved = true;
          console.log("ALL PRODUCTS : ", that.allProducts);
          resolve(that.allProducts);
        })
      } else {
        reject()
      }
    })
  }

  public retrieveProductAttributes() {
    // FIXME : added a fixed attribute until the wordpress attributes are set properly
    // this.http.get(
    //   `${this.url}/wp-json/wc/v3/products/attributes?per_page=100&page=1&consumer_key=${
    //     this.consumerKey
    //   }&consumer_secret=${this.consumerSecret}`
    // ).subscribe(attrs => {
    //   console.log("%%%",attrs)
    //   this.allProductAttributes = attrs;
    // })
    
    this.allProductAttributes = [];
    this.allProductAttributes.push({
      id: 0,
      name: "Μέθοδος Κοπής",
      slug: "pa_cutting-method",
      type: "select"
    })
  }

  public getProductVariations(productId: number): Promise<any> {
    let that = this;
    return new Promise(function(resolve, reject){
      that.http.get(
        `${that.url}/wp-json/wc/v3/products/${productId}/variations?consumer_key=${
          that.consumerKey
        }&consumer_secret=${that.consumerSecret}`
      ).subscribe(vars => {
        resolve(vars);
      })
    })
  }

  // NOT USED CURRENTLY
  // public mapOptionNameToVariationId(option: string): number {
  //   switch(option) {
  //     case "Μερίδες":
  //       return 3009;
  //     case "Ολόκληρο κομμάτι":
  //       return 3008;
  //     case "Μερίδες":
  //       return 3009;
  //     case "Μερίδες":
  //       return 3009;
  //     default:
  //       return null;
  //   }
  // }
}
import { Injectable } from '@angular/core';

@Injectable()
export class CartHandler {

  private productList: {
    image: string,
    info: string,
    name: string,
    price: string,
    weight: number,
    quantity: number
  }[] = [];

  private totalPrice: number = 0;

  constructor() { 
    console.log(this.productList)
  }

  public addProductToCart(product: any) {
    this.productList.push(product);
    this.totalPrice += parseFloat(product.price.replace(',', '.')) * product.weight;       // Missing logics for when we decide to use quantity
  }

  public getProductsInCart() {
    return this.productList;
  }

  public getNumOfProducts() {
    console.log("PRODUCTS IN CART: ", this.productList.length)
    return this.productList.length;
  }

  public getTotalPrice() {
    return this.totalPrice;
  }

  public removeProduct(index: number) {
    this.totalPrice -= parseFloat(this.productList[index].price.replace(',', '.')) * this.productList[index].weight;
    this.productList.splice(index, 1);
  }

  public deleteProducts() {
    this.productList = [];
    this.totalPrice = 0;
  }

}
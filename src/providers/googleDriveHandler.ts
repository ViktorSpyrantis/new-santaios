import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GoogleDriveHandler {
  // FIXME : I added a workaround on the get product fns here(let _data: any = data). Find a better solution

  private sheet = 3;

  constructor(public http: HttpClient) { }

  // this fn is not used currently
  public getProducts(sheet: number) {
    const url = `https://spreadsheets.google.com/feeds/cells/1iPS-nAjwo8tmOk6kyBGxbctByRCoCI7FISqZxkQufFk/${sheet}/public/full?alt=json`;
    let products = [];
    this.http.get(url).subscribe(data => {
      let _data: any = data;      // we use this because of error
      for(let i=0; i<(_data.feed.entry.length)/4; i++) {
        products.push(
          {
            product: {
              name: _data.feed.entry[(i*4) + 0].content.$t,
              price: _data.feed.entry[(i*4) + 1].content.$t,
              image: _data.feed.entry[(i*4) + 2].content.$t,
              info: _data.feed.entry[(i*4) + 3].content.$t,
              weight: null
            }
          }
        )
      }
    })
    return products;
  }
  
  public getProductsFromSheet(file: Files, allProducts?: any[]): any {
    let products = [];
    this.http.get(file).subscribe(data => {
      let _data: any = data;      // we use this because of error
      let productIds = [];
      for(let i=0; i<(_data.feed.entry.length); i++) {
        productIds.push(+_data.feed.entry[(i)].content.$t)
      }

      allProducts.forEach(prod => {
        if (productIds.includes(prod.id)) products.push(prod)
      })
    })
    return products;
  }
}

export enum Files {
  SUGGESTED = 'https://spreadsheets.google.com/feeds/cells/1iPS-nAjwo8tmOk6kyBGxbctByRCoCI7FISqZxkQufFk/8/public/full?alt=json',
  WEEK_OFFERS = 'https://spreadsheets.google.com/feeds/cells/1iPS-nAjwo8tmOk6kyBGxbctByRCoCI7FISqZxkQufFk/7/public/full?alt=json'
}


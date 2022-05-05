import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import { Product } from '../component/products/product.model'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartList:Product[] = []
  productList = new BehaviorSubject<any>([])
  constructor() { }

  getProducts(){
    return this.productList.asObservable()
  }
  setProducts(product:any){
     this.cartList.push(...product)
     this.productList.next(product)
  }
  addToCart(product:any){
    this.cartList.push(product)
    this.productList.next(this.cartList)
    this.getTotalPrice()
    // console.log(this.cartList)
  }
  getTotalPrice(): number{
    let grandTotal = 0
    this.cartList.map((prod:any)=> {
      grandTotal += prod.total
    })
    return grandTotal
  }
  removeItem(product:any){
    this.cartList.map((prod:Product, index:number)=> {
      if(product.id === prod.id){
        this.cartList.splice(index, 1)
      }
    })
    this.productList.next(this.cartList)
  }
  clearCart(){
    this.cartList = []
    this.productList.next(this.cartList)
  }
}

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  product:any = []
  grandTotal:number = 0
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(data=> {
      this.product = Object.values(data)
      this.grandTotal = this.cartService.getTotalPrice()
    })
  }
  remove(product:any){
    console.log(product)
    this.cartService.removeItem(product)
  }
emptyCart(){
  this.cartService.clearCart()
}
}

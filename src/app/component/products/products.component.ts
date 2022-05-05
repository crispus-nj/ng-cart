import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList:Product[] = []
  filterCategory:Product[]
  constructor(private api:ApiService, private cartService:CartService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe(data => {
      this.productList = Object.values(data)
      this.productList.forEach((prod:Product)=>{
        Object.assign(prod, {quantity:1, total:prod.price} )
      })

      // console.log(this.productList)
    })
  }
  addToCart(prod:Product){
    this.cartService.addToCart(prod)
    // console.log(prod)
  }
  filterProducts(name:string){
    this.productList.filter((product: any) => {
      if((product.category == name) || name == ''){
        return product
      }
    })
  }

}

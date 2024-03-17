import { Component, inject } from '@angular/core';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartService = inject(ItemService);

  cart: any[] = [];

  updateCart(id: string, quantity: number): void {
    this.cartService.removeFromCart(id, quantity);
  }
  ngOnInit() {
    this.cart = this.cartService.cart;
  }

  // @Input() cart: Item[] = [];

  // constructor() {}

  // addItem(item: Item): void {
  //   item.quantity++;
  // }

  // removeItem(item: Item): void {
  //   if (item.quantity > 1) {
  //     item.quantity--;
  //   } else {
  //     const index = this.cart.indexOf(item);
  //     if (index !== -1) {
  //       this.cart.splice(index, 1);
  //     }
  //   }
  // }

  // getTotal(): number {
  //   if (!this.cart) return 0; // Guard against undefined cart
  //   return this.cart.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // }
}

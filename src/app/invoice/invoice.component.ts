import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  cartService = inject(ItemService);

  cart: any[] = [];

  ngOnInit() {
    this.cart = this.cartService.cart;
  }
}

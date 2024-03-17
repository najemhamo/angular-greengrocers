import { Component, OnInit, inject } from '@angular/core';
import { ItemService } from '../service/item.service';
import { Item } from '../models/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent {
  constructor(private router: Router) {}
  _ItemService = inject(ItemService);

  items: any;
  filteredItems: Item[] = [];

  addItem(item: Item): void {
    const itemObj = { ...item, quantity: 1 };
    this._ItemService.addToCart(itemObj);
  }

  filter(type: string) {
    this.filteredItems = type
      ? this.items.filter((item: Item) => item.type === type)
      : this._ItemService;
  }

  filterByPrice() {
    this.filteredItems = this.items.sort((a: any, b: any) => a.price - b.price);
  }

  filterByName() {
    this.filteredItems = this.items.sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );
  }

  ngOnInit(): void {
    this.items = this._ItemService.getItems();
    this.filteredItems = this.items;
    console.log(this.items);
  }
}

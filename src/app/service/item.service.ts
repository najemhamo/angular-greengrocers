// item.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { cartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private fruitApiUrl =
    'https://boolean-api-server.fly.dev/groceries?type=fruit';
  private vegetableApiUrl =
    'https://boolean-api-server.fly.dev/groceries?type=vegetable';

  private AllItemsAPI = 'https://boolean-api-server.fly.dev/groceries';

  private total: BehaviorSubject<number>;
  constructor() {
    this.total = new BehaviorSubject<number>(0);
  }
  http = inject(HttpClient);
  cart: cartItem[] = [];

  getFruits(): Promise<Item[]> {
    try {
      return firstValueFrom(this.http.get<Item[]>(this.fruitApiUrl));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getVegetables(): Promise<Item[]> {
    try {
      return firstValueFrom(this.http.get<Item[]>(this.vegetableApiUrl));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getItems(): Promise<Item[]> {
    try {
      return firstValueFrom(this.http.get<Item[]>(this.AllItemsAPI));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  setTotal() {
    this.total.next(
      this.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }

  getTotal() {
    return this.total.asObservable();
  }

  addToCart(item: cartItem): void {
    const cartItemIndex = this.cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (cartItemIndex !== -1) {
      this.cart[cartItemIndex].quantity++;
    } else {
      const newItem = { ...item, quantity: 1 };
      this.cart.push(newItem);
    }
    this.setTotal();
  }

  removeFromCart(id: string, quantity: number): void {
    const cartItemIndex = this.cart.findIndex((cartItem) => cartItem.id === id);
    if (cartItemIndex !== -1) {
      if (this.cart[cartItemIndex].quantity > 1) {
        this.cart[cartItemIndex].quantity -= quantity;
      } else {
        this.cart.splice(cartItemIndex, 1);
      }
    }
    this.setTotal();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css'],
})
export class TotalComponent {
  constructor(private router: Router) {}
  _itemService = inject(ItemService);

  total: number = 0;

  invoice() {
    if (this._itemService.cart.length > 0) {
      this.router.navigateByUrl(`checkout`);
    }
  }

  ngOnInit() {
    this._itemService.getTotal().subscribe((val) => {
      this.total = val;
    });
  }
}

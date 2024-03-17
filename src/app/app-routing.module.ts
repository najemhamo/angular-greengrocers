import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {
    path: 'store',
    component: StoreComponent,
  },
  { path: 'invoice', component: InvoiceComponent },
  { path: '', redirectTo: '/store', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

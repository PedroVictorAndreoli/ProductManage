import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateProductComponent } from './create-product/create-product.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create', component: CreateProductComponent },
    { path: 'create/:id', component: CreateProductComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

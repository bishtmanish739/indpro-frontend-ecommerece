import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { Question1Component } from './question-1/question-1.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponentComponent },
  {path:'register',component:RegisterComponent},
  { path: 'products', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  {path:'question-1',component:Question1Component}
 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

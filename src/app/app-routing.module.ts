import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { Question1Component } from './question-1/question-1.component';
import { Question2Component } from './question-2/question-2.component';
import { Question3Component } from './question-3/question-3.component';
import { Question4Component } from './question-4/question-4.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponentComponent },
  {path:'register',component:RegisterComponent},
  { path: 'products', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'my-orders', component: MyOrderComponent },
  {path:'question-1',component:Question1Component},
  {path:'question-2',component:Question2Component},
  {path:'question-3',component:Question3Component},
  {path:'question-4',component:Question4Component},
  { path: '**', redirectTo: 'products', pathMatch: 'full' }



 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

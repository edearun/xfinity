import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ProductDetailComponent} from '../app/components/product-detail/product-detail.component';
import {ProductListComponent} from '../app/components/product-list/product-list.component';

const routes:Routes = [
    {
        path:'',
        redirectTo:'productList',
        pathMatch:'full'
    },
    {
        path:'productList',
        component:ProductListComponent,
        pathMatch:'full'
    },
    {
        path:'productDetail/:slug',
        component:ProductDetailComponent,
        pathMatch:'full'
    }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit, OnDestroy {
  productName = 'A Book';
  isDisabled = true;
  products = ['A Book', 'A Tree'];
  private productsSubscription!: Subscription;

  constructor(private productsService: ProductsService) {
    setTimeout(() => {
      // this.productName = 'A Tree';
      this.isDisabled = false;
    }, 3000);
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
    this.productsSubscription = this.productsService.productsUpdated.subscribe(
      () => {
        this.products = this.productsService.getProducts();
      }
    );
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  onAddProduct(form: any) {
    // this.products.push(this.productName);
    if (form.valid) this.productsService.addProduct(form.value.productName);
  }

  onRemoveProduct(productName: string) {
    this.products = this.products.filter((p) => p !== productName);
  }
}

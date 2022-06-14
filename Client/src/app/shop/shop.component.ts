import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/productBrand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  // products$: Observable<IProduct[]>;
  // brands$: Observable<IBrand[]>;
  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  totalProductsCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAscending' },
    { name: 'Price: High to Low', value: 'priceDescending' },
  ];
  // trigger$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    // this.products$ = this.getProducts$();
    // this.trigger$.next(true);
    // this.brands$ = this.getBrands$();
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.totalProductsCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBrands() {
    this.shopService.getBrands().subscribe((response) => {
      this.brands = [{ id: 0, name: 'All' }, ...response];
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
    // this.trigger$.next(true);
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    // this.trigger$.next(true);
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSearchReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
// getProducts$() {
//   return this.trigger$.pipe(
//     switchMap((_) =>
//       this.shopService
//         .getProducts(this.shopParams)
//         .pipe(map((response) => response.data))
//     )
//   );
// }

// getBrands$() {
//   return this.shopService.getBrands().pipe(
//     map((response) => {
//       return [{ id: 0, name: 'All' }, ...response];
//     })
//   );
// }

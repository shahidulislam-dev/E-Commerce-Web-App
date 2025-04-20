import { join } from 'node:path';
import { Component, OnInit } from '@angular/core';
import { filters, singleFilter } from './filter-data';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../states/products/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  filterData: any
  singleFilterData: any
  products: any
  levelThree: any

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private store: Store<AppState>
  ) { }
  ngOnInit() {
    this.filterData = filters
    this.singleFilterData = singleFilter

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.levelThree = params.get("levelThree")
        var reqData = {
          colors: [],
          sizes: [],
          minPrice: 0,
          maxPrice: 10000,
          minDiscount: 0,
          category: params.get("levelThree"),
          stock: null,
          pageNumber: 0,
          pageSize: 10
        };
        this.productService.findProductByCategory(reqData);
      });

    this.activatedRoute.queryParams.subscribe((params) => {
      const colors = params['color'];
      const sizes = params['size'];
      const price = params['price']
      const discount = params['discount']
      const stock = params['stock']
      const sort = params['sort']
      const pageNumber = params['pageNumber']
      const minPrice = price?.split("-")[0];
      const maxPrice = price?.split("-")[1];

      var reqData = {
        colors: colors ? [colors].join(",") : [],
        sizes: sizes,
        minPrice: minPrice ? minPrice : 0,
        maxPrice: maxPrice ? maxPrice : 100000,
        minDiscount: discount ? discount : 0,
        category: this.levelThree,
        stock: stock,
        sort: sort,
        pageNumber: pageNumber ? pageNumber : 0,
        pageSize: 10
      };
      this.productService.findProductByCategory(reqData);
    })

    this.store.pipe(select((store) => store.product)).subscribe((product) => {
      this.products = product.products.content
      console.log("Store Data", product.products.content);

    })
  }

  handleMultipleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };

    const filterValues = queryParams[sectionId] ? queryParams[sectionId].split(",") : [];
    const valueIndex = filterValues.indexOf(value);
    if (valueIndex != -1) {
      filterValues.splice(valueIndex, 1)
    } else {
      filterValues.push(value);
    }

    if (filterValues.length > 0) {
      queryParams[sectionId] = filterValues.join(",")
    } else {
      delete queryParams[sectionId];
    }
    this.router.navigate([], { queryParams })
  }

  handleSingleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    queryParams[sectionId] = value;
    this.router.navigate([], { queryParams })
  }



}

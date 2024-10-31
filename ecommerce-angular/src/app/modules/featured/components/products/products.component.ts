import { Component, OnInit } from '@angular/core';
import { filters, singleFilter } from './filter-data';
import { mensPantsPage1 } from '../../../../../Data/pants/men_page1';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  filterData: any
  singleFilterData: any
  menPants: any
  constructor(private router: Router, private activatedRoute: ActivatedRoute){}
  ngOnInit(){
    this.filterData = filters
    this.singleFilterData = singleFilter
    this.menPants = mensPantsPage1
  }

  handleMultipleSelectFilter(value:string, sectionId:string){
    const queryParams = {...this.activatedRoute.snapshot.queryParams};
    
    const filterValues = queryParams[sectionId] ? queryParams[sectionId].split(","):[];
    const valueIndex = filterValues.indexOf(value);
    if(valueIndex != -1){
      filterValues.splice(valueIndex,1)
    }else{
      filterValues.push(value);
    }

    if(filterValues.length > 0){
      queryParams[sectionId] = filterValues.join(",")
    }else{
      delete queryParams[sectionId];
    }
    this.router.navigate([],{queryParams})
  }

  handleSingleSelectFilter(value:string, sectionId:string){
    const queryParams = {...this.activatedRoute.snapshot.queryParams};
    queryParams[sectionId] = value;
    this.router.navigate([],{queryParams})
  }



}

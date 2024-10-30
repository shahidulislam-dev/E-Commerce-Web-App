import { Component, OnInit } from '@angular/core';
import { menJeans } from '../../../../../Data/Men/men_jeans';
import { womenGouns } from '../../../../../Data/Gouns/wonmen_gouns';
import { womenTops } from '../../../../../Data/Women/women_tops';
import { mensKurta } from '../../../../../Data/Men/mens_kurta';
import { shoes } from '../../../../../Data/Shoes/shoes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  menJeans:any
  womenGouns:any
  womenTops:any
  mensKurta:any
  shoes:any
  ngOnInit(){
    this.menJeans = menJeans.slice(0,6)
    this.womenGouns = womenGouns.slice(0,6)
    this.womenTops = womenTops.slice(0,6)
    this.mensKurta = mensKurta.slice(0,6)
    this.shoes = shoes.slice(0,6)
  }
}

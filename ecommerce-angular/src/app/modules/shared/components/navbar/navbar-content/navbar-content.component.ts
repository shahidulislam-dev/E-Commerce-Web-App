import { Component, Input, OnInit } from '@angular/core';
import { navigation } from './nav-content';

@Component({
  selector: 'app-navbar-content',
  templateUrl: './navbar-content.component.html',
  styleUrl: './navbar-content.component.scss'
})
export class NavbarContentComponent implements OnInit{

category: any;
@Input() selectedSection: any;

ngOnInit() {
  this.category = navigation;
  console.log("Selected Section", this.selectedSection);
  
}

}

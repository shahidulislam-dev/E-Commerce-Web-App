import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  currentSection:any
  isNavbarContentOpen: any;
  openNavbarContent(section:any) {  
    this.isNavbarContentOpen = true;
    this.currentSection = section;
  }

  closeNavbarContent(){
    this.isNavbarContentOpen = false;
  }

  navigateTo(path:any) {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent){
    const modalContainer = document.querySelector(".modal-container");
    const openButton = document.querySelectorAll(".open-button");

    let clickInsideButton = false;
    openButton.forEach((button:Element)=>{
      if(button.contains(event.target as Node)){
        clickInsideButton = true;
      }
    })
    if(modalContainer && !clickInsideButton && this.isNavbarContentOpen){
      this.closeNavbarContent()
    }
  }

}

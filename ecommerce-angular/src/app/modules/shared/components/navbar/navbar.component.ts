import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthComponent } from '../../../auth/auth.component';

import { UserService } from '../../../../states/user/user.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router,
    private dialog: MatDialog,
    private userServic: UserService,
    private store: Store<AppState>
  ) { }

  currentSection: any
  isNavbarContentOpen: any;
  userProfile: any;

  openNavbarContent(section: any) {
    this.isNavbarContentOpen = true;
    this.currentSection = section;
  }

  closeNavbarContent() {
    this.isNavbarContentOpen = false;
  }

  navigateTo(path: any) {
    this.router.navigate([path])
  }


  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('jwt')) this.userServic.getUserProfile()
    this.store.pipe(select((store) => store.user)).subscribe((user) => {
      this.userProfile = user.userProfile;
      if(user.userProfile){
        this.dialog.closeAll();
      }
    })
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const modalContainer = document.querySelector(".modal-container");
    const openButton = document.querySelectorAll(".open-button");

    let clickInsideButton = false;
    openButton.forEach((button: Element) => {
      if (button.contains(event.target as Node)) {
        clickInsideButton = true;
      }
    })
    if (modalContainer && !clickInsideButton && this.isNavbarContentOpen) {
      this.closeNavbarContent()
    }
  }

  handleOpenLoginModal = () => {
    console.log("AuthWork");

    this.dialog.open(AuthComponent, {
      width: "500px",
      disableClose: false
    })
  }

  handleLogout = ()=>{
    this.userServic.logout();
  }

}

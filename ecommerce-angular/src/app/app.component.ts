import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './states/user/user.service';
import { AppState } from './models/AppState';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ecommerce-angular';

  constructor(private router: Router,
    private dialog: MatDialog,
    private userServic: UserService,
    private store: Store<AppState>
  ) { }


  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('jwt')) {
      this.userServic.getUserProfile();
    }

    this.store.pipe(select(store => store.auth)).subscribe(() => {
      if (typeof window !== 'undefined' && localStorage.getItem('jwt')) {
        this.userServic.getUserProfile();
      }
    });
  }


}

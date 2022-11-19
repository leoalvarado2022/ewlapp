import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProvider } from 'src/app/provider/user.provider';
import {  } from "@angular/core";

@Component({
  selector: 'menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss'],
})
export class MenuToolbarComponent implements OnInit {

  @Input() name: string;

  constructor(private router: Router, private userProvider: UserProvider) { }

  ngOnInit() {}

  logout() {
    this.userProvider.logout();
  }

}

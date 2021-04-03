import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser=null;
  constructor() { }

  ngOnInit(): void {
    this.currentUser  = JSON.parse(sessionStorage.getItem('currentUser'));
   
  }

}

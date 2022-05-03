import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  testuser = '';

  constructor() { }

  ngOnInit(): void {
    this.getLoggedIn();
  }

  getLoggedIn() {
    if(this.testuser !== '') {
      this.testuser = 'sdgdfgdfg'
    }
  }
}

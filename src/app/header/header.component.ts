import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) { }
  username = window.localStorage.getItem('username') || '';
  ngOnInit(): void {
  }
  goLogin(): void {
    this.router.navigate(['login']);
  }
  goRegister(): void {
    this.router.navigate(['signup']);
  }
}

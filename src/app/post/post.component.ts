import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private authService: AuthenticationService,public router: Router) { }
  username = '';
  title = '';
  content = '';
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
  }
  submit(): void {
    if (!this.title) {
      return alert('please write title');
    }
    if (!this.content) {
      return alert('please write content');
    }
    if (!this.username) {
      return alert('please login');
    }
    this.authService.post(this.username, this.title, this.content).subscribe((response) => {
      if (response.status === 1) {
        alert(response.message);
        this.router.navigate(['']);
      }
    });
  }
}

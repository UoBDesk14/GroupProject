import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    public router: Router,
  ) {
  }

  private subscriber!: Subscription;
  list = {
    data: []
  };

  ngOnInit(): void {
  }

  goPost(): void {
    this.router.navigate(['post']);
  }
}

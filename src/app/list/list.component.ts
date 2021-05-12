/* tslint:disable: template-no-call-expression */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    public router: Router,
    private authService: AuthenticationService,
  ) {
  }

  private subscriber!: Subscription;
  list = {
    data: [],
    total: 0,
  };
  page = 1;
  pageSize = 8;

  ngOnInit(): void {
    this.getList();
  }
  goPost(): void {
    this.router.navigate(['post']);
  }
  getList(): void {
    this.authService.getList(this.page, this.pageSize).subscribe((res) => {
      // @ts-ignore
      this.list = { data: res.data, total: res.total };
    });
  }
  // @ts-ignore
  goPage(event) {
    this.page = event.pageIndex + 1;
    this.getList();
  }
  // tslint:disable-next-line:typedef
  goDetail(id: string) {
    // @ts-ignore
    this.router.navigate(['detail'], { queryParams: { id }});
  }
}

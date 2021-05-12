import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
  ) {
  }

  content = '';
  username = '';
  data: any;

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.getDetail();
  }

  // tslint:disable-next-line:typedef
  getDetail() {
    // @ts-ignore
    this.authService.getDetail(this.route.queryParams._value.id).subscribe((data: any) => {
      this.data = data.data[0];
    });
  }

  submit() {
    if (!this.content) {
      return alert('Write your comment');
    }
    // @ts-ignore
    this.authService.comment(this.content, this.username, this.route.queryParams._value.id).subscribe((data: any) => {
      alert('成功');
      this.getDetail();
    });
  }
// @ts-ignore
  deleteItem() {
    const r = confirm('Are you sure to delete this post?');
    if (r === true) {
      // @ts-ignore
      this.authService.deleteItem(this.route.queryParams._value.id).subscribe((data: any) => {
        alert('ok');
        this.router.navigate(['']);
      });
    }
  }
}

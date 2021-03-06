import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonApiService} from '../service/common-api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private authService: CommonApiService,
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
      data.data[0].comments = data.data[0].comments.reverse();
      this.data = data.data[0];
    });
  }

  submit() {
    if (!this.content) {
      return alert('Write your comment');
    }
    // @ts-ignore
    this.authService.comment(this.content, this.username, this.route.queryParams._value.id).subscribe((data: any) => {
      alert('success');
      this.getDetail();
    });
  }
// @ts-ignore
  deleteItem() {
    const r = confirm('Are you sure to delete this post?');
    if (r === true) {
      if (this.username === this.data.username) {
        // @ts-ignore
        this.authService.deleteItem(this.route.queryParams._value.id).subscribe((data: any) => {
          alert('ok');
          this.router.navigate(['']);
        });
      } else {
        alert('no permission');
      }
    }
  }
}

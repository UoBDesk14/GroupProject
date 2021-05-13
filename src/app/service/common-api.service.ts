import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

const host = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(private http: HttpClient) {
  }


  post(username: string, title: string, content: string) {
    const postData = {
      username,
      title,
      content
    };
    return this.http.post<{ status: number, message: string }>(
      `${host}/api/post/add`,
      postData
    );
  }

  getList(page: number, pageSize: number) {
    return this.http.get<{ data: any[], status: number, message: string, total: number }>(`${host}/api/post/list?page=${page}&pageSize=${pageSize}`);
  }

  // @ts-ignore
  getDetail(id) {
    return this.http.get<{ data: any[], status: number, message: string }>(`${host}/api/post/detail?id=${id}`);
  }

  // @ts-ignore
  comment(content, username, id) {
    return this.http.post<{ data: any[], status: number, message: string }>(`${host}/api/post/comment`, {content, id, username});
  }
  // @ts-ignore
  deleteItem(id) {
    return this.http.get<{data: any[], status: number, message: string }>(`${host}/api/post/deleteItem?id=${id}`);
  }

  register(username: string, password: string) {
    const userData = {
      username: username,
      password: password,
    };
    return this.http
      .post<{ message: String; error: Error, regSuc: boolean }>(
        `${host}/api/user/register`,
        userData
      );
  }

  login(username: string, password: string) {
    const loginData = {
      username: username,
      password: password,
    };
    return this.http
      .post<{ token: string; message: string, username: string }>(
        `${host}/api/user/login`,
        loginData
      );
  }


  setTokenAndUserName(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }
}

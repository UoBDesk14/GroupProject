import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private pathStateSubject: Subject<string>;

  constructor() {
    this.pathStateSubject = new Subject<string>();
  }

  canGoto(newPath: string):void {
    this.pathStateSubject.next(newPath);
  }

}

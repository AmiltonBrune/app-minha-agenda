import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public url = this.router.url;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      // @ts-ignore: Unreachable code error
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/signin`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(name: string, email: string, password: string, phone: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/signup`, {
        email,
        name,
        password,
        phone,
        passwordConfirmation: password,
      })
      .pipe(
        map(() => {
          return this.router.navigateByUrl('/login');
        })
      );
  }
  logout() {
    localStorage.removeItem('currentUser');
    // @ts-ignore: Unreachable code error
    this.currentUserSubject.next(null);
  }
}

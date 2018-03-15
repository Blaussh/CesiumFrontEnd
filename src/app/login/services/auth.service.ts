import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  private loginPath = 'http://localhost:8080/users/login';

  TOKEN_KEY = 'token';

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  }

  login(loginData) {
       // tslint:disable-next-line:max-line-length
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      // const body = {'username' : 'shaib', 'password' : 'shaib'};
      this.http.post<any>(this.loginPath, loginData, {headers}).subscribe(res => {
         console.log(res);
         localStorage.setItem(this.TOKEN_KEY, res.token);
         localStorage.setItem('isAdmin', res.user.isAdmin);
      });
  }

}

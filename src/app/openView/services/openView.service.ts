import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class OpenViewService {

  constructor(private http: HttpClient) {}

   getViewPath = 'http://localhost:8080/api/view/';
   private loginPath = 'http://localhost:8080/users/login';
   private allViewsPath = 'http://localhost:8080/api/views';

    getView(id: string) {
    // tslint:disable-next-line:max-line-length
      const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTk0YzgxZDlkZDE5NjQzZWM5MjJlMGYiLCJpYXQiOjE1MjEwMTg0MjMsImV4cCI6MTUyMjIyNDQyM30.an0SJcBhVZlG_Ayex0EYTNjwT5uK-4T-RsE0EjTxsUM');
      return this.http.get<any>(this.getViewPath + id, {headers});
    }

    fetchViews() {
      // tslint:disable-next-line:max-line-length
      const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTk0YzgxZDlkZDE5NjQzZWM5MjJlMGYiLCJpYXQiOjE1MjEwMTg0MjMsImV4cCI6MTUyMjIyNDQyM30.an0SJcBhVZlG_Ayex0EYTNjwT5uK-4T-RsE0EjTxsUM');
      const body = {'username' : 'shaib', 'password' : 'shaib'};
      this.http.post(this.loginPath, body, {headers}).subscribe((res) => {
        console.log(res);
      });
      return this.http.get<any>(this.allViewsPath, {headers}).map(data => {
        return data;
      });
    }
}

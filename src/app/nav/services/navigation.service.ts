import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NavigationService {

  constructor(private http: HttpClient) {}
   // messages = [];
   // users = [];
   resFormat = 'json';
   googleApiKey = 'AIzaSyAsLzZ29pzS1reHlIwt5aa2N9KPcYbC0mg';
   path = 'https://maps.googleapis.com/maps/api/geocode/';
   getViewPath = 'http://localhost:8080/api/view/';

   fly(address: string) {
    return  this.http.get<any>(`${this.path}${this.resFormat}?address=${address}&language=en&key=${this.googleApiKey}`);
    }

    getView(id: string) {
    // tslint:disable-next-line:max-line-length
      const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTk0YzgxZDlkZDE5NjQzZWM5MjJlMGYiLCJpYXQiOjE1MjEwMTg0MjMsImV4cCI6MTUyMjIyNDQyM30.an0SJcBhVZlG_Ayex0EYTNjwT5uK-4T-RsE0EjTxsUM');
      return this.http.get<any>(this.getViewPath + id, {headers});
    }

}

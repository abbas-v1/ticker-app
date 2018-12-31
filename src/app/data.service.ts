import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  topic: Object;

  constructor(private http: HttpClient) { }

  postTickerData(tickerData) { 
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=UTF-8'
      })
    };
  
    return this.http.post('http://localhost:8080/ticker', tickerData, httpOptions)
    .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      }
    );
  }

}

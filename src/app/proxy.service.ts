import { Injectable } from '@angular/core';
import { Proxy } from './proxy';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(private http: HttpClient) { }

  public getProxies(): Observable<Proxy[]> {
    return this.http.get<Proxy[]>(' http://localhost:4000/proxy/');

  }
}

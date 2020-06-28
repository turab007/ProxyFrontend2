import { Injectable } from '@angular/core';
import { Proxy } from './proxy';
import { UrlTest } from './urlTest';
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

  public getTests(ip: string): Observable<UrlTest[]> {
    return this.http.get<UrlTest[]>(`http://localhost:4000/proxy/getTests/${ip}`);
  }

  public doTests(url, ip): Observable<UrlTest[]> {
    return this.http.post<UrlTest[]>(`http://localhost:4000/proxy/performTest`, { ip: ip, url: url });
  }

  public delete(ip) {
    console.log('checking ip', `http://localhost:4000/proxy/${ip}`);
    return this.http.post(`http://localhost:4000/proxy/delete`, { ip: ip });
  }

  public refresh() {
    return this.http.get(`http://localhost:4000/proxy/refresh`);
  }

}

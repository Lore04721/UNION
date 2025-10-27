
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = '/api';
  constructor(private http: HttpClient) {}
  get<T>(url: string, params?: Record<string, any>): Observable<T> {
    return this.http.get<T>(`${this.base}${url}`, { params });
  }
  post<T>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.base}${url}`, body);
  }
}

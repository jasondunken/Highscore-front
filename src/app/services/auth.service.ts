import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService
  ) {}

  httpOptions = { 
    headers: new HttpHeaders().set('content-type', 'application/json')
  }

  login(user, pass): Observable<any> {
    return this.http.post(`${environment.authURL}auth/login`,
      { username: user.name, password: pass.word },
      this.httpOptions).pipe(
        tap(response => {
          this.cookieService.set("access_token", response["access_token"]);
        })
      )
  }
}


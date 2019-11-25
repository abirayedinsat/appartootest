import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { equal } from 'assert';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username, password): Observable<boolean> {
        return this.http.post<{token}>('http://localhost:4020/auth/login', { username , password })
            .pipe(
                map(result => {
                    console.log("uuuuuuuuuuser" + result.token);
                    if ((result.token)==(undefined)){
                    return false;}
                    localStorage.setItem('access_token', result.token);
                    return true;
                })
            );
    }

    logout() {
        localStorage.removeItem('access_token');
    }

    public get loggedIn(): boolean {
        return (localStorage.getItem('access_token') !== null);
    }
}
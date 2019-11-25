import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`http://localhost:4020/profile`).pipe(map(res => res));
  }
  getf( ) {
    return this.http.get(`http://localhost:4020/search`).pipe(map(res => res));
  }
  getfriend() {
    return this.http.get(`http://localhost:4020/friends`);
  }
addFriend(id)
{
  return this.http.post(`http://localhost:4020/friendrequest/${id}`,{});
}
  removerequest(id) {
    return this.http.post(`http://localhost:4020/friendrequest/removerequest/${id}`,{});
  }
addTolist(user, requester ) {
    return this.http.post(`http://localhost:4020/friendrequest`, {user , requester });
  }

  friend(user, requester) {
    return this.http.post(`http://localhost:4020/friends`, { user, requester });
  }
  getrequest() {
    return this.http.get(`http://localhost:4020/friendrequest`).pipe(map(res => JSON.stringify(res)));
  }

  register(
    role: string,
    username: string,
    password: string,
    famille: string,
    age: string,
    nourriture: string
  ) {
    return this.http.post(`http://localhost:4020/auth/register`, {
      password,
      username,
      role,
      famille,
      age,
      nourriture
    });
  }
  updateProfile(
    role: string,
    famille: string,
    age: string,
    nourriture: string
  ){
         return this.http.post('http://localhost:4020/profile', { role , famille, age, nourriture });


}



}

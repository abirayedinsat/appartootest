import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { AuthenticationService, UserService } from '../_services';
import { Router } from "@angular/router";


@Component({ templateUrl: "home.component.html" , styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit {
  currentUser: User;
  age: string;
  role: string;
  famille: string;
  nourriture: string;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllUsers();
  }



  private loadAllUsers() {
    this.userService.getAll().subscribe(data => {
      let d = JSON.stringify(data);
      let dd = d.substring(11, d.length - 1);
      let json = JSON.parse(dd);

      this.age = json.age;
      this.role = json.role;
      this.famille = json.famille;
      this.nourriture = json.nourriture;

      //   let   loudScreaming = Object.keys.d;
      // console.log('role' + loudScreaming);
    });
    this.userService.getf().subscribe(data => {
      let d = JSON.stringify(data);
      let json = JSON.parse(d);
      let username =[] ;
      let id =[];
      for(var i =0 ; i<json.length;i++)
      {
username[i]= json[i].username ;
id[i]=json[i]._id;
console.log('username'+username[i]+"id ; "+id[i]);
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}


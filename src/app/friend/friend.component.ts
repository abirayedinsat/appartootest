import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../_services';

@Component({
  selector: "app-friend",
  templateUrl: "./friend.component.html",
  styleUrls: ["./friend.component.css"]
})
export class FriendComponent implements OnInit {
id=[];
friends=[]; role=[];
  constructor(  private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() { this.loadfriend();}
  private loadfriend() {
    this.userService.getfriend().subscribe(data => {
      let d = JSON.stringify(data);
      let json = JSON.parse(d);
      for (let i = 0; i < json.length; i++) {
          this.id[i] = json[i].user;

        }
    });
      this.userService.getf().subscribe(data => {
        let d = JSON.stringify(data);
        let json = JSON.parse(d);

        for (let j = 0; j < this.id.length; j++) {
        for (let i = 0; i < json.length; i++) {
          if (json[i]._id == this.id[j]) {
            console.log("friend", json)
            this.friends[j] = json[i].username;
          }
        }
        }

      });




  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}

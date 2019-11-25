import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AuthenticationService } from '../_services';
import { sended } from '../request/req';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.component.html',
  styleUrls: ['./addfriend.component.css']
})
export class AddfriendComponent implements OnInit {
  sButtonVisible = [];
  username = [];
  id = [];
  user=[];
  req=[];
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loadAllUsers();
  }
  decline(i) {
    this.userService.removerequest(this.req[i]).pipe()
      .subscribe(
        data => {
          console.log("friend aded");
          this.router.navigate(["/"]);
        },
        error => {
          console.log("friendrequest sended"); this.router.navigate(["/"]);
        },

      );

  }
  accept(i) {
   this.userService
      .friend(
        this.user[i], this.id[i] ,
      )
      .pipe()
      .subscribe(
        data => {
          console.log("friend aded");
          this.router.navigate(["/"]);

        },
        error => {
          console.log("friendrequest sended");
          this.router.navigate(["/"]);
        },

      );
    this.userService
      .removerequest(this.req[i]).pipe()
      .subscribe(
        data => {
          console.log("friend aded");


        },
        error => {
          console.log("friendrequest sended");

        },

      );
  }

  private loadAllUsers() {

    this.userService.getrequest().subscribe(data => {

      let dd = data.substring(1, data.length - 1);
      if (dd.length!=0)
      {
    let json = JSON.parse(data);
      console.log("json    " +data);
      for (let i = 0; i < json.length; i++)
      {
        this.req[i] = json[i]._id;
        this.id[i] = json[i].requester ;
        this.user[i] = json[i].user
      }
      this.userService.getf().subscribe(data => {
        let d = JSON.stringify(data);
        let json = JSON.parse(d);

      let  k=0 ;
        for (let j = 0; j < this.id.length; j++){
        for (let i = 0; i < json.length; i++) {
          if( this.id[j].user==json[i]._id ){
          this.username[k] = json[i].username;
        k= k+1 ; }
      }
    }

    });

    /*  for (let i = 1; i < json.length; i++) {
        this.username[i - 1] = json[i].username;
        this.id[i - 1] = json[i]._id;
        console.log('username' + this.username[i - 1] + "id : " + this.id[i - 1]);
      }*/
    }
    });
  }


}

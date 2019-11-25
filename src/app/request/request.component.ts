import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService, AlertService } from '../_services';
import { Router } from '@angular/router';
import { sended} from './req';
import { JsonPipe } from '@angular/common';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
 isButtonVisible=[];
 username = [];
 id = [];
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  roleOptions = ['protection', 'breaker'];
 friend=[];
  user;      idnewUser;
 constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
   private formBuilder: FormBuilder,
   private alertService: AlertService
) {
   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      role: ["protect"],
      famille: ["", Validators.required],
      nourriture: ["", Validators.required],
      age: [Validators.required],
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
    this.loadAllUsers();
}
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log("username", this.registerForm.value.username);
    this.loading = true;
    this.userService
      .register(
        this.registerForm.value.role,
        this.registerForm.value.username,
        this.registerForm.value.password,
        this.registerForm.value.famille,
        this.registerForm.value.age,
        this.registerForm.value.nourriture
      )
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("Registration successful", true);
          this.userService.getf().subscribe(data => {
            let d = JSON.stringify(data);
            let json = JSON.parse(d);
            for (let i = 0; i < json.length; i++) {
              if (this.registerForm.value.username === json[i].username) {
                console.log("friendrequest", json[i]._id);

                this.idnewUser = json[i]._id;
                break ;
              }
            }
            this.userService
              .addFriend(
                this.idnewUser
              )
              .pipe()
              .subscribe(
                data => {
                  console.log("friendrequest sended");
                },
                error => {
                  console.log("friendrequest sended");
                },

              );
          },
            error => {
              this.alertService.error(error);

            }
          );
          });


  }

/*add(i) {
  this.userService
    .addFriend(
      this.id[i]
    )
    .pipe()
    .subscribe(
      data => {
        this.isButtonVisible[i]=true ;
        sended.push(this.id[i]);
console.log("friendrequest sended")    ;  },
      error => {
        console.log("friendrequest sended");
      },

    );
}
*/
  private loadAllUsers() {
 /*  this.userService.getAll().subscribe(data => {
      let d = JSON.stringify(data);
      let dd = d.substring(11, d.length - 1);
      let json = JSON.parse(dd);

this.iduser = json.user;*/

        }



     // );




 // }
}

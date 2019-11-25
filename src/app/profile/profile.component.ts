import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, AlertService, UserService } from '../_services';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  roleOptions = ["protection", "no"];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      role: ["protect"],
      famille: ['' ,Validators.required],
      nourriture: ['', Validators.required],
      age: [Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onupdate() {
    this.submitted = true;
    let a :string
if (isNaN(this.registerForm.value.age)) {
  a = "";
} else {
  a = this.registerForm.value.age.toString();
}
    // reset alerts on submit
    this.alertService.clear();
console.log(a);
    // stop here if form is invalid

    this.loading = true;
    this.userService
      .updateProfile(
        this.registerForm.value.role,
        this.registerForm.value.famille,a,
this.registerForm.value.nourriture
      )
      .pipe(first())
      .subscribe(
        data => {

          this.alertService.success("update successful", true);
          this.router.navigate(["/"]);
        },
        error => {
          this.alertService.success("update successful", true);
                    this.router.navigate(["/"]);

          this.loading = false;
        }
      );
  }
}


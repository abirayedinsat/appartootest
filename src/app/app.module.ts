import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
export function tokenGetter() {
    return localStorage.getItem('access_token');
}


import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { AuthenticationService, UserService } from './_services';
import { AuthGuard } from './_helpers';;
import { FriendComponent } from './friend/friend.component'
;
import { ProfileComponent } from './profile/profile.component'
;
import { RequestComponent } from './request/request.component'
;
import { AddfriendComponent } from './addfriend/addfriend.component'
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:4020'],
                blacklistedRoutes: ['localhost:4020/auth/register']
            }
        })
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent
,
        FriendComponent ,
        ProfileComponent ,
        RequestComponent ,
        AddfriendComponent ],
    providers: [

AuthenticationService,
AuthGuard,
UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };

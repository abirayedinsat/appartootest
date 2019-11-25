import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';
import { ProfileComponent } from './profile/profile.component';
import { FriendComponent } from './friend/friend.component';
import { RequestComponent } from './request/request.component';
import { AddfriendComponent } from './addfriend/addfriend.component';

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "friend", component: FriendComponent, canActivate: [AuthGuard] },
  { path: "request", component: RequestComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "add", component: AddfriendComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const appRoutingModule = RouterModule.forRoot(routes);

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {UserComponent} from './user/user.component';
import {AccountComponent} from './account/account.component';
import {MovieComponent} from './movie/movie.component';
import {MovieShowComponent} from './movie-show/movie-show.component';
import {PurchaseComponent} from './purchase/purchase.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardUserComponent} from './boarduser/board-user.component';
import {BoardAdminComponent} from './boardadmin/board-admin.component';
import {PurchaseformComponent} from './purchaseform/purchaseform.component';
import {ManagementComponent} from './management/management.component';
import {MovieShowEditComponent} from './movie-show-edit/movie-show-edit.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {CheckInComponent} from './check-in/check-in.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {AttendantsComponent} from './attendants/attendants.component';

const routes: Routes = [{path: 'index', component: IndexComponent},
  {path: '', component: IndexComponent},
  {path: 'users', component: UserComponent},
  {path: 'movies', component: MovieComponent},
  {path: 'account', component: AccountComponent},
  {path: 'movieShows', component: MovieShowComponent},
  {path: 'movieShowEdit', component: MovieShowEditComponent},
  {path: 'movieShowEdit/:movieId/:movieShowId', component: MovieShowEditComponent, pathMatch: 'full'},
  {path: 'purchase', component: PurchaseComponent},
  {path: 'purchase/:id', component: PurchaseComponent, pathMatch: 'full'},
  {path: 'purchaseform', component: PurchaseformComponent},
  {path: 'purchaseform/:movieId/:movieShowId', component: PurchaseformComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'management', component: ManagementComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'checkIn', component: CheckInComponent},
  {path: 'edituser', component: EditUserComponent},
  {path: 'edituser/:userId', component: EditUserComponent, pathMatch: 'full'},
  {path: 'attendants', component: AttendantsComponent},
  {path: 'attendants/:movieShowId', component: AttendantsComponent, pathMatch: 'full'}
];

// {path: '**', redirectTo: 'index'}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule {
}

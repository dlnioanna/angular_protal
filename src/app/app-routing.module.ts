import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {UserComponent} from './user/user.component';
import {AccountComponent} from './account/account.component';
import {MovieComponent} from './movie/movie.component';
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {MovieShowComponent} from './movie-show/movie-show.component';
import {PurchaseComponent} from './purchase/purchase.component';
import {RoomComponent} from './room/room.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardUserComponent} from './boarduser/board-user.component';
import {BoardAdminComponent} from './boardadmin/board-admin.component';
import {PurchaseformComponent} from './purchaseform/purchaseform.component';

const routes: Routes = [{path: 'index', component: IndexComponent},
  {path: 'users', component: UserComponent},
  {path: 'movies', component: MovieComponent},
  {path: 'account', component: AccountComponent},
  {path: 'movieShows', component: MovieShowComponent},
  {path: 'imageUpload', component: ImageUploadComponent},
  {path: 'purchase', component: PurchaseComponent},
  {path: 'purchase/:id', component: PurchaseComponent},
  {path: 'purchaseform', component: PurchaseformComponent},
  {path: 'purchaseform/:movieId/:movieShowId', component: PurchaseformComponent, pathMatch: 'full'},
  {path: 'rooms', component: RoomComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'admin', component: BoardAdminComponent}];

// {path: '**', redirectTo: 'index'}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule {
}

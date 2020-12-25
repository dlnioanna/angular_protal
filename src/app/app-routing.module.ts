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

const routes: Routes = [{path: 'index', component: IndexComponent},
  {path: 'users', component: UserComponent},
  {path: 'movies', component: MovieComponent},
  {path: 'account', component: AccountComponent},
  {path: 'movieShows', component: MovieShowComponent},
  {path: 'imageUpload', component: ImageUploadComponent},
  {path: 'purchase', component: PurchaseComponent},
  {path: 'rooms', component: RoomComponent},
  {path: '**', redirectTo: 'index'}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule {
}

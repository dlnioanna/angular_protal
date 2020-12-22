import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {UserComponent} from './user/user.component';
import {AccountComponent} from './account/account.component';
import {MovieComponent} from './movie/movie.component';
import {ImageUploadComponent} from './image-upload/image-upload.component';

const routes: Routes = [{path: 'index', component: IndexComponent},
  {path: 'users', component: UserComponent},
  {path: 'movies', component: MovieComponent},
  {path: 'account', component: AccountComponent},
  {path: 'imageUpload', component: ImageUploadComponent},
  {path: '**', redirectTo: 'index'}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule {
}

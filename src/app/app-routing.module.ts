import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [{path: 'index', component: IndexComponent},
  {path: 'user', component: UserComponent},
  {path: '**', redirectTo: 'index'}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule {
}

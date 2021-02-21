import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-boardadmin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content = '';
  form: any = {};
  user: any;
  users: User[];
  userName: string;
  email: string;

  constructor(private userservice: UserService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userName = this.form.username.trim();
    this.email = this.form.email.trim();
    this.userservice.getUserByUsernameOrEmail(this.form).subscribe(
      data => (this.user = data));
  }

}

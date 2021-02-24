import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-boardadmin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content = '';
  form: any = {};
  users: any[];
  userName: string;
  email: string;

  constructor(private userService: UserService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const uploadData = new FormData();
    uploadData.append('email', this.form.email);
    uploadData.append('username', this.form.username);
    this.httpClient.post<any[]>('http://localhost:8080/api/v1/getUsers', uploadData)
      .subscribe(
        response => {
          this.users = response;
        });
    console.log('users are ' + this.users.length);
  }

}

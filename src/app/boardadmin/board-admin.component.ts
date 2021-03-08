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
  usersFound: number;
  message: string;

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
          this.usersFound = this.users.length;
          if (this.usersFound === 0) {
            this.message = 'Δεν βρέθηκαν χρήστες με αυτά τα στοιχεία.';
          }else {
            this.message = null;
          }
        });
  }

}

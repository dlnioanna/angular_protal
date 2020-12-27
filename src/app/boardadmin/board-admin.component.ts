import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-boardadmin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content = '';

  constructor(private userservice: UserService) {
  }

  ngOnInit(): void {
    this.userservice.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      });
  }

}

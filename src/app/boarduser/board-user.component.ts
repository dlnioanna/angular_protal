import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-boarduser',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content = '';

  constructor(private userservice: UserService) {
  }

  ngOnInit(): void {
    // this.userservice.getUserBoard().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    // err => {
    //   this.content = JSON.parse(err.error).message;
    // });
  }

}

import { Component, OnInit } from '@angular/core';
import {RoomService} from '../services/room.service';
import {Movie} from '../models/movie';
import {Room} from '../models/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  rooms: Room[];

  getRooms(): void {
    this.roomService.getRooms().subscribe(
      rooms => (this.rooms = rooms));
  }
  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRooms();
  }

}

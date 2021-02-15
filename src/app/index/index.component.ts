import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Item, ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs: Array<Item>;
  constructor(private apiService: ApiService) {
  }
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.apiService.fetch().subscribe((data: Array<Item>) => {
      this.songs = data;
    }, (err) => {
      console.log(err);
    });
  }

}

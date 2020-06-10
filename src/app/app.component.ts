import { Component, OnInit } from '@angular/core';
import { SessionService } from './session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: SessionService, private router: Router) { }
  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}

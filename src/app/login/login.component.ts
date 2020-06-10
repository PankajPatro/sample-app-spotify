import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserModel } from '../models/user.model';
import { SessionService } from '../session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: FormControl = new FormControl('', Validators.required);
  password: string;
  userSubscription: Subscription;
  isValid : boolean = false;
  loginMessage: string;

  constructor(private authService: SessionService, private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.userName.valueChanges.subscribe(v => {
      if(v){
        this.isValid = true;
      }
      else{
        this.isValid = false;
      }
    })
  }

  login(){
    this.loginMessage = '';
    const userModel : UserModel = {
      UserName: this.userName.value,
      Password: this.password
    };
    this.loginMessage = this.authService.login(userModel);
    if(!this.loginMessage){
      this.router.navigateByUrl('');
    }
  }

  ngOnDestroy(){
    this.userSubscription ? this.userSubscription.unsubscribe() : '';
  }

}

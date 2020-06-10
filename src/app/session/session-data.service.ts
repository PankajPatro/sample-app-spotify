import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  constructor() { }

  login(creds: UserModel){
    const tokenResponse = {
      token: undefined,
      message: 'Invalid Login'
    }
    if(creds.UserName.trim().toLowerCase() === "admin" && creds.Password === "Test@123"){
      tokenResponse.token = uuidv4();
      tokenResponse.message = '';
    }
    return tokenResponse;
  }

}

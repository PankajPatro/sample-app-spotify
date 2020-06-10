import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';
import { SessionDataService } from './session-data.service';
import { tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';


@Injectable({
	providedIn: 'root'
})
export class SessionService {
	constructor(private authStore: SessionStore, private authDataService: SessionDataService) { }

	login(creds: UserModel) : string {
		var tokenResponse = this.authDataService.login(creds);
		this.authStore.login(tokenResponse);
		return tokenResponse.message;
	}

	logout() {
		this.authStore.logout();
	}
}

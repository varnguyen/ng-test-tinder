import { Injectable } from '@angular/core';
import { User } from 'src/app/models';

@Injectable({ providedIn: 'root' })

export class StateService {

    currentUsers() {
        const users = localStorage.getItem('users');
        if (!users) {
            return [];
        }
        return JSON.parse(users);
    }

    saveUser(user: User) {
        const users = this.currentUsers();
        users.unshift(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

}
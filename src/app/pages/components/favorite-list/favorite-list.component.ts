import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services';
import { User } from 'src/app/models';

@Component({
    selector: 'app-favorite-list',
    templateUrl: './favorite-list.component.html',
    styleUrls: ['./favorite-list.component.scss']
})

export class FavoriteListComponent implements OnInit {

    users: User[] = [];
    constructor(private stateService: StateService) {
    }

    ngOnInit(): void {
        this.getFavoriteList();
    }

    getFavoriteList() {
        this.users = this.stateService.currentUsers();
        this.users = this.users.map(user => new User().deserialize(user));
    }

}

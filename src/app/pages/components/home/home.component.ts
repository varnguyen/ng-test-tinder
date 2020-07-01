import { Component, OnInit, HostListener, Directive, ViewChild, ViewChildren, QueryList } from '@angular/core';
import {
    Direction,
    StackConfig,
    ThrowEvent,
    SwingStackComponent,
    SwingCardComponent,
    DragEvent
} from 'angular2-swing';
import { HomeService, StateService } from 'src/app/services';
import { User } from 'src/app/models';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    @ViewChild('myswing', { static: true }) swingStack: SwingStackComponent;
    @ViewChildren('mycards') swingCards: QueryList<SwingCardComponent>;
    stackConfig: StackConfig;

    users: User[] = [];
    status: 'nope' | 'like';
    loading = false;
    title = '';
    value = '';
    index = 0;

    constructor(
        private homeService: HomeService,
        private stateService: StateService
    ) {
        this.stackConfig = {
            // Default setting only allows UP, LEFT and RIGHT so you can override this as below
            allowedDirections: [Direction.LEFT, Direction.RIGHT, Direction.DOWN, Direction.UP],
            // Now need to send offsetX and offsetY with element instead of just offset
            throwOutConfidence: (offsetX, offsetY, element) => {
                return Math.round(
                    Math.abs(offsetX) / (element.offsetWidth / 2)
                );
            },
            throwOutDistance: (d) => {
                return 800;
            }
        };
    }

    ngOnInit(): void {
        this.getNewUser();
    }

    ngAfterViewInit() {
        this.swingStack.dragmove.subscribe(
            (event) => {
                this.detectAction(event);
            });
    }

    detectAction(event: DragEvent) {
        if (event.throwOutConfidence === 1) {
            if (event.offset > 0) {
                this.status = 'like';
            }
            if (event.offset < 0) {
                this.status = 'nope';
            }
        }
    }

    changeView(data) {
        this.title = data.title;
        this.value = data.value;
        this.index = parseInt(data.index, 10);
    }

    onThrowOut(event: ThrowEvent) {
        this.callFavoritingAction(this.status);
    }

    callFavoritingAction(action: 'nope' | 'like') {
        if (this.users.length === 0) {
            return;
        }

        if (action === 'nope') {
            this.nopeUser();
            return;
        }

        this.likeUser();

    }

    nopeUser() {
        this.getNewUser();
    }

    likeUser() {
        this.stateService.saveUser(this.users[0]);
        this.getNewUser();
    }

    resetView() {
        this.value = this.users[0].fullName;
        this.title = 'Hi, My name is';
        this.index = 0;
    }

    getNewUser(): void {
        this.loading = true;
        this.users = [];

        this.homeService.getNewUser().subscribe(
            (response) => {
                this.users = response.results.map(user => new User().deserialize(user));
                this.resetView();
                this.loading = false;
            }
        );
    }

}

import { Component, OnInit, HostListener, Directive } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    hover = true;

    constructor() { }

    ngOnInit(): void {
    }

    getNewUser(): void {
        console.log('call api get new user');
    }
   
    // @HostListener('mouseover') onMouseOver() {
    //     let part = this.el.nativeElement.querySelector('.card-text');
    //     this.renderer.setElementStyle(part, 'display', 'block');
    //     this.ishovering = true;
    // }

}

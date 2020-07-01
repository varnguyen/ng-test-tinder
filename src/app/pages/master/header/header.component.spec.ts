import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let router: Router;
    let location: Location;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [
                RouterTestingModule,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show router link name correct', () => {
        const homeLink = fixture.debugElement.query(By.css('a.home')).nativeElement.getAttribute('href');
        expect(homeLink).toEqual('/home');

        const favoriteLink = fixture.debugElement.query(By.css('a.favorite-list')).nativeElement.getAttribute('href');
        expect(favoriteLink).toEqual('/favorite-list');
    });
});

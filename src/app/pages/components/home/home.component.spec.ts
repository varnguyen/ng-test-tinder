import { AppModule } from './../../../app.module';
import { SwingModule } from 'angular2-swing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { HomeService } from 'src/app/services';
import { environment } from 'src/environments/environment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DragEvent, Direction, SwingStackComponent } from 'angular2-swing';
import { User } from 'src/app/models';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let httpTestingController: HttpTestingController;
    let homeService: HomeService;

    const mockResponse = {
        info: {
            page: 1,
            results: 1,
            seed: '62b5ab10ec0b2c2b',
            version: '1.3',
        },
        results: [
            {
                cell: '040-970-16-23',
                dob: { date: '1945-04-20T10:13:11.944Z', age: 75 },
                email: 'nelli.tuomi@example.com',
                gender: 'female',
                id: { name: 'HETU', value: 'NaNNA246undefined' },
                location: { street: { number: 8803, name: 'Rautatienkatu' }, city: 'Töysä', state: 'Satakunta', country: 'Finland' },
                login: { uuid: 'be91eaea-f167-4db1-abfc-070fa11911b7', username: 'silverbear533', password: 'zzzz' },
                name: { title: 'Mrs', first: 'Nelli', last: 'Tuomi' },
                nat: 'FI',
                phone: '02-051-074',
                picture: { large: 'https://randomuser.me/api/portraits/women/62.jpg', },
                registered: { date: '2019-03-06T20:42:07.789Z', age: 1 },
            }
        ]
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                AppModule
            ],
            providers: [
                HomeService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        httpTestingController = TestBed.inject(HttpTestingController);
        homeService = TestBed.inject(HomeService);
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call method getNewUser', () => {
        spyOn(component, 'getNewUser').and.callThrough();
        component.ngOnInit();
        expect(component.getNewUser).toHaveBeenCalledTimes(1);
    });

    describe('SHOULD SHOW INFOMATION USER', () => {
        let elementItems;
        const user = mockResponse.results;
        beforeEach(() => {
            const req = httpTestingController.expectOne(environment.api);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
            fixture.detectChanges();

            const items = fixture.debugElement.queryAll(By.css('.profile-item'));
            items.forEach((item, index) => {
                // check avatar display correct
                const src = user[index].picture.large;
                const avatar: HTMLImageElement = item.nativeElement.querySelector('img');
                expect(avatar.src).toContain(src);
            });
            component.users = user.map(user => new User().deserialize(user));
            // render items
            fixture.detectChanges();
            elementItems = fixture.debugElement.queryAll(By.css('.profile-item'));
            httpTestingController.verify();
        });

        it('should show avatar', () => {
            const img: HTMLImageElement = elementItems[0].nativeElement.querySelector('img');
            expect(img.src).toContain('https://randomuser.me/api/portraits/women/62.jpg');
            expect(elementItems.length).toBe(1);
        });

    });
});

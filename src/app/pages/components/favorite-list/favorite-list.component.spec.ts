import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteListComponent } from './favorite-list.component';
import { User } from 'src/app/models';
import { StateService } from 'src/app/services';

describe('FavoriteListComponent', () => {
    let component: FavoriteListComponent;
    let fixture: ComponentFixture<FavoriteListComponent>;
    let stateService: StateService;

    const usersFake = [
        {
            gender: 'male',
            name: { title: 'Mr', first: 'Ramon', last: 'Bähr' },
            location: {
                street: { number: 4895, name: 'Hauptstraße' },
            },
            email: 'ramon.bahr@example.com',
            login: {
                password: 'plastic',
                sha256: '13b04d5009ada20f9cd8e7921b11dae5d129f0d26e5aeb2fac24032f8cadf8f9'
            },
            dob: {
                date: '1981-05-16T23:36:56.871Z',
                age: 39
            },
            registered: {
                date: '2008-10-30T21:56:31.684Z',
                age: 12
            },
            phone: '0683-7379920',
            cell: '0175-2982047',
            id: { name: '', value: null },
            picture: {
                large: 'https://randomuser.me/api/portraits/men/74.jpg',
                medium: 'https://randomuser.me/api/portraits/med/men/74.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/men/74.jpg'
            },
            nat: 'DE'
        },
    ];
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FavoriteListComponent],
            providers: [
                { provide: StateService }
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        stateService = TestBed.inject(StateService);
        fixture = TestBed.createComponent(FavoriteListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show title correct', () => {
        const title = fixture.nativeElement.querySelector('h2');
        expect(title.innerText).toBe('Favorite List');
    });

    it('should show data correct', () => {
        // case data null
        localStorage.setItem('users', JSON.stringify([]));
        component.users = [];
        fixture.detectChanges();
        const title = fixture.nativeElement.querySelector('.data-empty');
        expect(title.innerText).toBe('Không có dữ liệu');

        // case have data
        localStorage.setItem('users', JSON.stringify(usersFake));
        const elementsFavorite = fixture.debugElement.queryAll(By.css('.box-user'));
        elementsFavorite.forEach((item, index) => {
            // check avatar display correct
            const src = usersFake[index].picture.large;
            const avatar: HTMLImageElement = item.nativeElement.querySelector('img');
            expect(avatar.src).toContain(src);

            const fullName = usersFake[index].name.first + ' ' + usersFake[index].name.last;
            const fullNameText = fixture.nativeElement.querySelector('h5');
            expect(fullNameText).toBe(fullName);
        });

    });

});

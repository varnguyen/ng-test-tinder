import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserResponse } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class HomeService {

    constructor(private httpClient: HttpClient) {
    }

    getNewUser(): Observable<UserResponse> {
        return this.httpClient.get<UserResponse>(environment.api).pipe(catchError(this.handleErrorPromise));
    }

    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
}

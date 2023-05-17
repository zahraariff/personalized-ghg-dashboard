import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService { // Constructor here is used to inject HttpClient dependency using the 'private' keyword.
    constructor(private http: HttpClient){ } // Constructor => A special method called when an instance of this service is created. Used to perform init tasks.
    getMessage() {
        return this.http.get(
            'http://localhost:3000/api/message');
    }
}
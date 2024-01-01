import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'http://localhost:3000/get-all-users'
const editUrlTemplate = 'http://localhost:3000/edit-user/:id'
const delUrlTemplate = 'http://localhost:3000/delete-user/:id'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {  }

  getAllUsers(){
    return this.httpClient.get(url);
  }

  editUserDetails(data: any, item: any): Observable<any> {
    const editUrl = editUrlTemplate.replace(':id', item);
    return this.httpClient.patch(editUrl, data);
  }

  deleteUser(id:any){
    console.log('service id', id)
    const delUrl = delUrlTemplate.replace(':id', id);
    console.log(delUrl)
    return this.httpClient.delete(delUrl);
  }

}



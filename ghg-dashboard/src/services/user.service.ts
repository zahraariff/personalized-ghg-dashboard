import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'http://localhost:3000/get-all-users'
const editUrlTemplate = 'http://localhost:3000/edit-user/:id'
const delUrlTemplate = 'http://localhost:3000/delete-user/:id'
const changePwUrlTemplate = 'http://localhost:3000/change-password/:id'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {  }

  getAllUsers(){
    return this.httpClient.get(url);
  }

  editUserDetails(data: any, id: any): Observable<any> {
    const editUrl = editUrlTemplate.replace(':id', id);
    return this.httpClient.patch(editUrl, data);
  }

  deleteUser(id:any){
    console.log('service id', id)
    const delUrl = delUrlTemplate.replace(':id', id);
    console.log(delUrl)
    return this.httpClient.delete(delUrl);
  }

  changeUserPw(item: any, id:any) {
    const changePwUrl = changePwUrlTemplate.replace(':id', id);
    return this.httpClient.patch(changePwUrl, item);
  }

}



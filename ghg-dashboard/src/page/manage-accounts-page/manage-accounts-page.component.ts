import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-accounts-page',
  templateUrl: './manage-accounts-page.component.html',
  styleUrls: ['./manage-accounts-page.component.scss']
})
export class ManageAccountsPageComponent {

  userData: any = [];
  editingRowIndex: number | null = null;
  userForm: FormGroup;
  dataID: any;

  constructor(private userService: UserService, private fb: FormBuilder){
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    var user = this.userService.getAllUsers();
    user.subscribe(res => {this.userData = res});
  }

  startEditing(index: number) {
    this.editingRowIndex = index;
  }

  stopEditing(id: any) {
    this.dataID = id;
    const userData = this.userForm.value;

    const updatedUserData: Record<string, any> = {};

    for (const key in userData) {
      if (userData.hasOwnProperty(key) !== null && userData[key] !== ''){
        updatedUserData[key] = userData[key];
      }
    }

    console.log('updatedUserData', updatedUserData)
    
    this.userService.editUserDetails(updatedUserData, this.dataID) 
    .subscribe(response => {
      console.log('User details updated successfully', response);
    }, error => {
      console.error('Error updating user details', error);
    });
    this.editingRowIndex = null;
    this.userForm.reset();
    window.location.reload();
  }

  deleteUser(){
    const userId = this.dataID;
    this.userService.deleteUser(userId)
    .subscribe(
      (response) => {
        console.log('Data sent successfully', response);
        window.alert("User deleted successfully!");
        setTimeout(function(){ window. location. reload(); }, 3000);
      },
      (error) => {
        console.error('Error sending data', error)
        window.alert("Error in deleting the User");
      }
    );
    window.location.reload();
  }

  getDeleteId(id: any){
    this.dataID = id;
  }

}

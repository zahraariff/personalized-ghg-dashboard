import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent {
  editUserProfileForm: FormGroup;
  userProfileData: any = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService ){
    this.editUserProfileForm = this.formBuilder.group({
      username: [this.userProfileData.username],
      email: [this.userProfileData.email],
      password: [''],
      // orgName: ['']
    });
  }

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe(
      (res) => {
        this.userProfileData = res;
        // console.log(this.userProfileData); // Move the log statement inside the subscription callback
      },
      (error) => {
        // Handle any errors here
        console.error('Error fetching user profile:', error);
      }
    );
  }
  

  submitUserData(item: any){
    console.log(item);

    // Get the id in localStorage
    var id = this.authService.getUserId();
    this.userService.editUserDetails(item, id)
    .subscribe(response => {
      console.log('User details updated successfully', response);
    }, error => {
      console.error('Error updating user details', error);
    });; 
    // window.location.reload();
  }


}

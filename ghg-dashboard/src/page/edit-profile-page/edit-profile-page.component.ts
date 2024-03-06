import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent {
  editUserProfileForm: FormGroup;
  changePwForm: FormGroup;
  userProfileData: any = [];
  password: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService, 
    private router: Router ){
    this.editUserProfileForm = this.formBuilder.group({
      username: [this.userProfileData.username],
      email: [this.userProfileData.email],
      // password: [''],
      // orgName: ['']
    });

    this.changePwForm = this.formBuilder.group({
      password: [],
      retypePassword: []
    })
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
    console.log(id);
    this.userService.editUserDetails(item, id)
    .subscribe(response => {
      console.log('User details updated successfully', response);
    }, error => {
      console.error('Error updating user details', error);
    });; 
    window.location.reload();
  }

  promptConfirmation() {
    if(confirm("Do you want to reset your password?")) {
      // 
      this.router.navigate(['/edit-profile']);
    }

  }

  submitPassword(item: any) {
    console.log(item);
    const pw = item.password;
    const retype = item.retypePassword;
    if(pw !== retype) {
      window.alert("Your passwords do not match! Please try again.");
    } else {
      var id = this.authService.getUserId();
      console.log(pw);
      const passwordObject = { password: pw }; // Creating an object with the password property
      this.userService.changeUserPw(passwordObject, id).subscribe( () => {
        // Password changed successfully
        // You can provide feedback to the user if needed
        window.alert("Password changed successfully!")
      },
      error => {
        // Handle error from the service call
        console.error('Error changing password:', error);
        window.alert('There is an error changing your password. Please try again.')
        // You can also display an error message to the user
        // using a notification service or other method
      });
    }

  }


}

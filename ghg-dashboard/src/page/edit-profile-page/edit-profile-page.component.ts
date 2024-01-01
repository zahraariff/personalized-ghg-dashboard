import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent {
  editUserProfileForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.editUserProfileForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      orgName: ['']
    });
  }

  submitUserData(item: any){
    // call edit profile service
  }
}

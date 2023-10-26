import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  isAdmin: boolean = false;

  constructor(private cookieService: CookieService) { }

  ngOnInit(){
    this.cookieService.set('role', 'admin');
    const cookieValue = this.cookieService.get('role');
    console.log("cookie", cookieValue)
  }

  getUserRole(){
    const cookieValue = this.cookieService.get('role');
    console.log(cookieValue)
    if (cookieValue === "admin") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

}

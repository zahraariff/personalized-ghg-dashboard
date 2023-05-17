import { Component, OnInit } from '@angular/core'; // OnInit is an interface that defines 'ngOnInit' lifecycle hook method.
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ghg-dashboard';
  message: any;
  constructor(private apiService: ApiService) {};
  ngOnInit() {
    this.apiService.getMessage().subscribe(data => {
      this.message = data;
    });
  }
}

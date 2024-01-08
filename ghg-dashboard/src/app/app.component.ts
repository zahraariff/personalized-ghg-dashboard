import { Component, OnInit } from '@angular/core'; // OnInit is an interface that defines 'ngOnInit' lifecycle hook method.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ghg-dashboard';
  message: any;
  constructor() {};
  ngOnInit() {
    
  }
}

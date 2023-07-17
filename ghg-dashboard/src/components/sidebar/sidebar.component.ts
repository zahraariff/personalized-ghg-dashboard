import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard' },
    { path: '/iot-sensor', title: 'IoT Sensor' },
    { path: '/dashboard', title: 'Emission Data' },
    { path: '/dashboard', title: 'Graph' },
    { path: '/dashboard', title: 'Report' },
    { path: '/home', title: 'User Profile' }
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  };

  logout(){
    this.authService.logout();
    localStorage.clear();
    window.location.reload();
  }

  isClear(){
    this.authService.isClear();
  }
 
}

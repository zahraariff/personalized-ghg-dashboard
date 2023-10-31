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
    { path: '/emissions', title: 'Emission Data' },
    { path: '/graphs', title: 'Graph' },
    { path: '/dashboard', title: 'Report' },
    { path: '/edit-profile', title: 'User Profile' },

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
    this.updateMenuItems();
  };

  logout(){
    this.authService.logout();
    localStorage.clear();
    window.location.reload();
  }

  isClear(){
    this.authService.isClear();
  }

  updateMenuItems(){
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    const role = localStorage.getItem('role');
    
    if (role === 'admin') {
      this.menuItems.push({ path: '/admin', title: 'Admin'});
    }
  }
 
}

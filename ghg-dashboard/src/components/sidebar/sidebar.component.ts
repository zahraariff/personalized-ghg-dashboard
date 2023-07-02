import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    // icon: string;
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

  constructor() {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  };
 
}

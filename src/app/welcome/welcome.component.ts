/**
 * Modify this file to fetch and display the login details
 */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { user } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  users: user[]; // type this variable using user.type.ts file
  constructor(public userService: UserService) {}

  ngOnInit() {
    /*
     * interceptors can be used to append token for every token
     */
    this.userService.getUsers().subscribe((data) => {
      this.users = data.data;
      console.log(data);
    });
  }

  destroySession() {
    sessionStorage.removeItem('access-token');
    sessionStorage.setItem('isAuthenticated', 'false');
  }

  ngOnDestroy() {}
}

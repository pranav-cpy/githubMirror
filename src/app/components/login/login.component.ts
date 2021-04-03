import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = '';
  constructor(private apiService: ApiService, private router:Router) { }

  ngOnInit(): void {
  }
  fetchUser(){
    this.apiService.getUserDetails(this.userName).subscribe(data=> {
      if(data){
          sessionStorage.setItem('currentUser',JSON.stringify(data));
          console.log(data.avatar_url)
          this.router.navigate(['home']);
      }
    }
     )
  }
}

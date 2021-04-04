import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
currentUser=null;
starCount=0 ;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.currentUser  = JSON.parse(sessionStorage.getItem('currentUser'));
    this.apiService.getStaredRepos(this.currentUser.login).subscribe((data)=>{
      this.starCount = data.length;
      console.log(this.starCount)
    })
  }

}

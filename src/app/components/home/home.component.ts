import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedTab = 0;
  currentUser;
  repoCount;
  constructor(private apiService: ApiService) { this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')); }

  ngOnInit(): void {

    // this.apiService.getUserDetails('pranav-cpy').subscribe(data=>{
    //   sessionStorage.setItem('currentUser',data);
    // })
    this.apiService.getRepositories(this.currentUser.login).subscribe(data =>{
      this.repoCount = data.length
    })
  }

}

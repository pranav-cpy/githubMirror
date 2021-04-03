import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contibutions',
  templateUrl: './contibutions.component.html',
  styleUrls: ['./contibutions.component.scss']
})
export class ContibutionsComponent implements OnInit {

  repositoryData=null;
  currentUser;

  constructor(private apiService:ApiService) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

   }

  ngOnInit(): void {
    
    this.apiService.getRepositories(this.currentUser.login).subscribe(data =>{
      this.repositoryData = (data.length > 6)? data.slice(0,6):data;
    })
  }

}

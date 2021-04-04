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
  contributionData;
  yearCount;
  startYear;
  selectedContributionYear =0 ;
  constructor(private apiService:ApiService) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

   }

  ngOnInit(): void {
    
    this.apiService.getRepositories(this.currentUser.login).subscribe(data =>{
      this.repositoryData = data;
      this.repositoryData = this.repositoryData.sort(this.compare).slice(0,6);
      // (data.length > 6)? data.slice(0,6):data;

      this.repositoryData.forEach(e => {
        this.apiService.getRepoLanguages(this.currentUser.login,e.name).subscribe(data=>{
          

         e['repoLanguage'] = Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b);
        })
      });
    })
    this.apiService.getContributions(this.currentUser.login).subscribe(data =>{
      this.contributionData = data;
      })

    
      this.startYear = new Date(this.currentUser.created_at).getFullYear();
      this.yearCount = new Date().getFullYear() -   this.startYear
     }
   compare(a,b) {
    if (a.updated_at < b.updated_at)
       return -1;
    if (a.updated_at > b.updated_at)
      return 1;
    return 0;
  }

}

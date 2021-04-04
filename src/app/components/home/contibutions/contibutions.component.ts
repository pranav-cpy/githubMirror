import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
declare var Plotly: any;
@Component({
  selector: 'app-contibutions',
  templateUrl: './contibutions.component.html',
  styleUrls: ['./contibutions.component.scss']
})

export class ContibutionsComponent implements OnInit {
  repositoryData=null;
  currentUser;
  contributionData=[];
  yearCount;
  startYear;
  selectedContributionYear =0 ;
  gdata = [
    {
      z: [[1, 2, 10, 5, 1,8,2,10,8,2,10,0,4,5,3,6,1,0,0,5,3,2,5,5,1,1,2,3,4,5,7,1,1,2,6,9,10,3,2,1,2,3,4,5,9,1,2,4],
      [10, 8, 3, 5, 6,8,2,10,7,2,10,5,4,5,3,6,2,0,0,5,6,2,5,4,1,1,2,4,4,5,7,5,5,2,6,9,5,6,7,1,9,9,4,5,9,1,2,4], 
      [2, 9, 5,9, 1,8,8,10,8,4,7,0,4,5,5,6,1,7,0,5,3,2,5,5,9,1,2,4,4,5,7,1,7,2,5,4,10,9,2,1,2,3,4,7,9,3,2,4],
      [5, 2, 7, 5, 1,8,2,10,8,2,10,4,4,9,3,6,1,0,4,5,3,6,5,5,5,4,2,2,4,5,7,1,1,2,6,9,7,3,2,1,2,3,4,5,9,1,6,4],
      [9, 7, 10, 5, 1,8,2,7,8,3,10,0,4,7,3,6,1,0,0,5,7,9,5,5,1,1,7,9,4,5,7,1,1,2,6,9,10,3,2,1,2,3,4,9,7,1,7,4],
      [4, 2, 4, 9, 1,7,2,6,8,2,5,0,4,5,3,6,1,5,0,5,6,2,5,5,1,1,2,3,4,5,7,1,1,2,6,9,10,3,2,1,2,3,4,5,9,1,2,4],
      [2, 7, 10, 5, 1,8,2,10,8,2,10,0,4,5,3,6,1,0,0,5,3,6,5,5,1,5,2,4,4,5,7,4,9,2,7,9,9,3,2,1,2,3,4,5,7,1,2,6]   
    ],
      x: ['Jan','Jan2','Jan3','Jan4','Feb','Feb2','Feb3','Feb4','Mar','Mar2','Mar3','Mar5','Apr','Apr2','Apr3','Apr4','May','May2','May3','May4','Jun','Jun2','Jun3','Jun4','Jul','Jul2','Jul3','Jul4','Aug','Aug2','Aug3','Aug4','Sep','Sep2','Sep3','Sep4','Oct','Oct2','Oct3','Oct4','Nov','Nov2','Nov3','Nov4','Dec','Dec2','Dec3','Dec4'],
      y: ['Saturday','Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday','Sunday',],
      type: 'heatmap',
      hoverongaps: true,
      colorscale: [
        [0, '#ffffff'],
        [1, '#216e39'],
      ],
      xgap:1,
      ygap:1,
      
    }
    
  ];
  layout = {
    // title: 'Annotated Heatmap',
    showlegend: true,
    annotations: [],
    xaxis: {
      ticks: '',
      side: 'top',
       dtick:4,
    },
    yaxis: {
      ticks: '',
      ticksuffix: ' ',
      // width: 700,
      // height: 700,
      autosize: false,
      dtick:2
    },
    
  };

  layoutSmall = {
    // title: 'Annotated Heatmap',
    showlegend: true,
    annotations: [],
    xaxis: {
      ticks: '',
      side: 'top',
      dtick:4,
      showticklabels: true,
    },
    yaxis: {
      ticks: '',
      ticksuffix: ' ',
      // width: 700,
      // height: 700,
      autosize: false,
      dtick:2,
      showticklabels: false,
    },
    
  };

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
     ngAfterViewInit(){
       console.log("after view init")
      Plotly.newPlot(document.getElementById('Graph'), this.gdata,this.layout);

      Plotly.newPlot(document.getElementById('Graph-small'), this.gdata,this.layoutSmall);
     }
   compare(a,b) {
    if (a.updated_at < b.updated_at)
       return -1;
    if (a.updated_at > b.updated_at)
      return 1;
    return 0;
  }

}

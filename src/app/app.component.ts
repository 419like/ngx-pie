import { Component } from '@angular/core';

export class Hero {
  id: number;
  name: string;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  hero: Hero = {
		id:1,
		name:'heroName1'
	}
  pieData: any;
  constructor(){
    window.setInterval(()=>{
      this.pieData = {
        centerX:100,
        centerY:100,
        radius:50,
        listData:[{
          name: '通话中',
          value:Math.floor(Math.random()*100),
          color:'rgb(0,0,255)'
        },{
          name: '话后',
          value:Math.floor(Math.random()*10),
          color:'rgb(56,118,29)'
        },{
          name: '就绪',
          value:Math.floor(Math.random()*10),
          color:'rgb(157,119,170)'
        },{
          name: '小休',
          value:Math.floor(Math.random()*20),
          color:'rgb(255,0,0)'
        },{
          name: '状态异常',
          value:Math.floor(Math.random()*5),
          color:'rgb(185,185,0)'
        }]
      }
    },2000)
  }

}

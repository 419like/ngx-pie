import { Component,Input,OnChanges,OnInit } from '@angular/core';


@Component({
  selector: 'my-pie',
  templateUrl: './pie.html',
  styleUrls: ['./pie.css']
})

export class PieComponent implements OnChanges,OnInit {
  @Input() options:any;
  centerX:Number;
  centerY:Number;
  radius:Number;
  timer:any;
  list:Array<any> = [];
  step:any = 0;
  totalStep = 48;


  constructor(){
    console.log(this.options);
  }
  ngOnInit(){
    console.log(this.options);
  }
  ngOnChanges(changes:any){
    console.log(changes);
    if(changes.options.currentValue&&changes.options.currentValue.listData){

      window.clearInterval(this.timer);

      this.centerX = changes.options.currentValue.centerX;
      this.centerY = changes.options.currentValue.centerY;
      this.radius = changes.options.currentValue.radius;


      let listData = changes.options.currentValue.listData;
      let total = 0;
      listData.forEach((item,index)=>{
        total += item.value;
      })
      for (var i = 0; i< listData.length; ++i) {
        let item = listData[i];
        if(i === 0){
          item.start = 0;
          item.end = item.value;
        }else{
          item.start = listData[i-1].end;
          item.end = item.start + item.value;
        }
      }

      if(changes.options.previousValue){
        let preListData = changes.options.previousValue.listData;
        listData.forEach((item,index)=>{
          let preItem = preListData[index];
          item.startAngle_old = preItem.startAngle_cur;
          item.endAngle_old = preItem.endAngle_cur;
          item.startAngle_cur = preItem.startAngle_cur;
          item.endAngle_cur = preItem.endAngle_cur;
          item.startAngle = (item.start/total)*360;
          item.endAngle = (item.end/total)*360;
          let params = {
            startAngle:item.startAngle_old,
            endAngle:item.endAngle_old
          }
          item.dStr = this.cal(params);
        })
      }else{
        listData.forEach((item)=>{
          item.startAngle_old = 0*360;
          item.endAngle_old = 0*360;
          item.startAngle_cur = 0*360;
          item.endAngle_cur = 0*360;
          item.startAngle = (item.start/total)*360;
          item.endAngle = (item.end/total)*360;
          let params = {
            startAngle:item.startAngle_old,
            endAngle:item.endAngle_old
          }
          item.dStr = this.cal(params);
        })
      }
      this.list = listData;
      this.startAnimotion();
    }
  }


  startAnimotion(){
    this.step = this.totalStep;
    this.timer = window.setInterval(()=>{
       if(this.step <= 0 ){
          window.clearInterval(this.timer);
       }else{
         this.step = this.step - 1;
         this.stepTo(this.step)
       }
    },1000/this.totalStep);
  }

  stepTo(step){
    this.list.forEach(item=>{
      item.startAngle_cur = item.startAngle_old+(item.startAngle-item.startAngle_old)*this.easeOutCubic((this.totalStep-step)/this.totalStep);
      item.endAngle_cur = item.endAngle_old+(item.endAngle-item.endAngle_old)*this.easeOutCubic((this.totalStep-step)/this.totalStep);
      let params = {
        startAngle:item.startAngle_cur,
        endAngle:item.endAngle_cur
      }
      item.dStr = this.cal(params);
    })
  }

  easeOutCubic(pos){
    return (Math.pow((pos-1), 3) +1);
  },


  cal(params){
    // let params = {centerX:100,centerY:100,radius:50,startAngle:0,endAngle:30}
    params.centerX = this.centerX;
    params.centerY = this.centerY;
    params.radius = this.radius;

    let angleStartPointX = params.centerX + params.radius*Math.sin(Math.PI/180*params.startAngle)
    let angleStartPointY = params.centerY - params.radius*Math.cos(Math.PI/180*params.startAngle)
    let angleEndPointX = params.centerX + params.radius*Math.sin(Math.PI/180*params.endAngle)
    let angleEndPointY = params.centerY - params.radius*Math.cos(Math.PI/180*params.endAngle)
    // return `M 49,49 
    //         L 49,1 
    //         A 48,48 0 0 1 90.56921938165306,72.99999999999999 
    //         Z`

    let big = (params.endAngle - params.startAngle)>180?1:0;
    return `M ${params.centerX},${params.centerY} 
            L ${angleStartPointX},${angleStartPointY} 
            A ${params.radius},${params.radius} 0 ${big} 1 ${angleEndPointX},${angleEndPointY} 
            Z`
    // return `M ${params.centerX},${params.centerY} 
    //         L ${angleStartPointX},${angleStartPointY} 
    //         L ${angleEndPointX},${angleEndPointY} 
    //         Z`
  }
}

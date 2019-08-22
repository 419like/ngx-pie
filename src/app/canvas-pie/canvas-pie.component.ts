import { Component, OnInit , ElementRef,ViewChild,AfterViewInit,Input} from '@angular/core';

@Component({
  selector: 'app-canvas-pie',
  templateUrl: './canvas-pie.component.html',
  styleUrls: ['./canvas-pie.component.css']
})
export class CanvasPieComponent implements OnInit,AfterViewInit {
  @ViewChild('canvas_rank1') canvas_rank1: ElementRef;
  @Input() options: any;
  ctx: CanvasRenderingContext2D;
  total = 0;
  totalStep = 24;
  currentStep = 0;
  canvasEl: HTMLCanvasElement;
  currentList: any;
  timer: any;
  timer_count: any;
  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges(changes:any){
  	if(changes.options.currentValue && changes.options.currentValue.listData){
  		// this.refresh(changes.options.currentValue);
  		this.currentList = changes.options.currentValue.listData;

  		// 获取总数
  		this.total = 0;
  		this.currentList.forEach((item)=>{
			this.total += item.y;
			// console.log(item.y);
  		})

  		for(var i=0;i<this.currentList.length;i++){
			let item = this.currentList[i];
			if(i === 0){
				item.sDeg = 0;
				item.endY = item.y;
				item.eDeg = 360*(item.y/this.total);
			}else{
				item.sDeg = 360*(this.currentList[i-1].endY/this.total);
				item.endY = this.currentList[i-1].endY + item.y;
				item.eDeg = 360*(item.endY/this.total);
			}
			// console.log(i,':',item.endY);
		}


		for(var i=0;i<this.currentList.length;i++){
			let item = this.currentList[i]
			if(changes.options.previousValue && changes.options.previousValue.listData){
	  			item.sDeg_pre = changes.options.previousValue.listData[i].sDeg_current;
	  			item.eDeg_pre = changes.options.previousValue.listData[i].eDeg_current;
	  			item.sDeg_current = item.sDeg_pre;
	  			item.eDeg_current = item.eDeg_pre;
	  		}else{
	  			console.log('如果没有之前的数据');
	  			// 如果没有之前的数据
	  			item.sDeg_pre = 0;
	  			item.eDeg_pre = 0;
	  			item.sDeg_current = 0;
	  			item.eDeg_current = 0;
	  		}
		}

  		this.startAnimotion();
  	}
  }

  startAnimotion(){
  	this.currentStep=0;
  	

  	this.loopAnimotion();
  	// this.currentStep = 0;
  	
  }

  loopAnimotion(){
  	// console.log('currentStep:',this.currentStep);
  	this.timer_count = window.setTimeout(()=>{
		this.timer = window.requestAnimationFrame(()=>{
		// this.timer = window.setTimeout(()=>{
	  		if(this.currentStep+1>this.totalStep){
	  			this.currentStep = 0;
	  			window.cancelAnimationFrame(this.timer);
	  		}else{
	  			this.ctx.clearRect(0,0,this.canvasEl.width,this.canvasEl.height);
	  			this.currentStep = this.currentStep + 1;
	  			// console.log(this.currentStep);
	  			let bi = this.currentStep/this.totalStep;
	  			// console.log('bi:',bi);
	  			this.currentList.forEach((item)=>{
	  				item.sDeg_current = item.sDeg_current+(item.sDeg-item.sDeg_current)*bi;
	  				item.eDeg_current = item.eDeg_current+(item.eDeg-item.eDeg_current)*bi;
	  				// console.log(item.sDeg_current,item.eDeg_current,item.color);
	  				this.drawSectorSimple(item.sDeg_current,item.eDeg_current,item.color);
	  			})
	  			this.loopAnimotion();
	  		}
	  	})
	},1000/24)
  }

  drawSectorSimple(sDeg,eDeg,color){
  	this.drawSector(this.options.centerX,this.options.centerY,this.options.radius,sDeg,eDeg,color);
  }

  ngAfterViewInit(){
  	this.canvasEl = this.canvas_rank1.nativeElement;
  	this.ctx = this.canvasEl.getContext('2d');
  }

  refresh(options){
  	this.total = 0;
  	options.listData.forEach((item)=>{
		this.total += item.y;
		console.log(item.y);
	})

	console.log('total:',this.total);
	console.log(this.total);

	for(var i=0;i<options.listData.length;i++){
		let item = options.listData[i];
		if(i === 0){
			item.sDeg = 0;
			item.endY = item.y;
			item.eDeg = 360*(item.y/this.total);
		}else{
			item.sDeg = 360*(options.listData[i-1].endY/this.total);
			item.endY = options.listData[i-1].endY + item.y;
			item.eDeg = 360*(item.endY/this.total);
		}
		console.log(i,':',item.endY);
	}


	options.listData.forEach((item)=>{

		// this.drawSector(this.options.centerX,this.options.centerY,this.options.radius,item.sDeg,item.eDeg,item.color);

		// console.log(this.options.centerX,this.options.centerY,this.options.radius,item.sDeg,item.eDeg,item.color);
	})
	// this.drawSector(100,100,50, 81.6, 6120, 'black')
  }

  drawSector(x,y,r,sDeg,eDeg,color){
  	// this.ctx.clearRect(0,0,this.canvasEl.width,this.canvasEl.height);
	this.ctx.fillStyle=color;
	this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(x,y);
    this.ctx.arc(x,y,r,(sDeg-90)*Math.PI/180,(eDeg-90)*Math.PI/180,false);
    this.ctx.closePath();
    this.ctx.restore();
	this.ctx.fill();
  }

}

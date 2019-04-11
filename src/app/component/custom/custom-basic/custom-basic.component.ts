import { CompEmitService } from './../../../providers/comp-emit.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SettingObject } from 'src/app/module/setting-object.module';
import { EChartOption } from 'echarts';
import { SettingStyle } from 'src/app/module/setting-style.module';
import { SettingDate } from 'src/app/module/setting-data.module';

@Component({
  selector: 'app-custom-basic',
  templateUrl: './custom-basic.component.html',
  styleUrls: ['./custom-basic.component.scss']
})
export class CustomBasicComponent  implements OnInit {
  @Input() settingObj: SettingObject;
  @Output() onChildComponentChange = new EventEmitter<any>();

  style: SettingStyle;
  data: SettingDate;
  chartOption: EChartOption;
  
  constructor(
    private compEmitService: CompEmitService
  ) { 

  }

  ngOnInit() {

  }
  
  initBasicData() {
    this.style = this.settingObj['style']
    this.data =  this.settingObj['data']
  }

  compEvent(event) {
    this.onChildComponentChange.emit(event);
  }

  expandUnit(param, other ?: string) {
    let paramVal = (!other ? this.style[param] : (this.style[param] + this.style[other] + 1)) || 1;    
    return paramVal + 'px'; 
  }

}
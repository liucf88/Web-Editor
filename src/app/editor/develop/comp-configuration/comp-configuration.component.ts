import { Component, OnInit, Input, Output ,EventEmitter} from "@angular/core";
import { AppService } from "src/app/providers/app.service";
import { CompListService } from "../../provider/comp-list.service";
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../core/provider/baseHttp/base-http.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';  
import { CompStorageLocalService } from '../../provider/comp-storage-local.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { PageAddComponent } from '../../../pages/workspace/page/page-add/page-add.component';
import { TempoToastrService } from '../../../core/provider/toaster/toastr.service';
import { SweetalertService } from 'src/app/core/provider/toaster/sweetalert.service';
import { PageEditComponent } from '../../../pages/workspace/page/page-edit/page-edit.component';

@Component({
  selector: 'app-comp-configuration',
  templateUrl: './comp-configuration.component.html',
  styleUrls: ['./comp-configuration.component.scss']
})
export class CompConfigurationComponent extends BaseHttpService implements OnInit {
  url: 'page';
  projectId:number;
  @Input() pageGridSetting;
  @Input() currnetPageComps;
  @Output() compDragEvent = new EventEmitter<any>();
  @Output() selCurrentPage = new EventEmitter<any>();
  @Output() activeCompFun = new EventEmitter<any>();
  @Output() addPage = new EventEmitter<any>();
  pages: any;
  pageId:number;
  compList:any[];
  showBool:boolean;
  currentTab:string;

  constructor(
    private http:HttpClient,
    private service: AppService,
    private activatedRoute: ActivatedRoute,
    private compListService: CompListService,
    private localService:CompStorageLocalService,
    private modalService: NgbModal,
    private toaster: TempoToastrService,
    private sweet:SweetalertService
  ) { 
    super(http, 'page');
  }

  ngOnInit() {
    this.getParams();
    this.initData();
  }

  getParams() {
    this.activatedRoute.queryParams.subscribe(res => {
      this.projectId = res['project'];
      this.pageId = res['page'];
    })
  }
  
  initData() {
    let _url = `pages/${this.projectId}`;
    Observable.forkJoin([this.getAll(_url)]).subscribe(res =>{
      let data = res && res[0] && res[0]['data'];
      this.pages = data;
      this.initPage();
    })
    this.showBool = true;
    this.compList = this.compListService.getCompList();
    this.selectTabs();
  }

  initPage() {
    let page = _.find(this.pages, {id: Number(this.pageId)});
    if(page) {
      page['actived'] = true;
      this.seledCurrentPage(page, 'init');
    }
  }
  dragCompEnd(event){
    this.compDragEvent.emit(event);
  }

  showGrigFun() {
    this.pageGridSetting['showLeft'] = !this.pageGridSetting['showLeft'];
  }

  selectTabs(tab:string = 'tabList') {
    this.currentTab = tab;
  }

  //选择当前页面的组件列表
  seledCurrentPage(page, state) {
    if(state !== 'init') {
      this.localService.clearEditorLocalStorage();
    } 
    this.selCurrentPage.emit(page);
  }

  activeComp(comp) {
    this.activeCompFun.emit(comp);
  }

  createPage() {
    this.addPageComponet();
    // this.addPage.emit()
  }

  addPageComponet() {
    let addComp = this.modalService.open(PageAddComponent);
    addComp.componentInstance.datas = {
      state:'addPage'
    };
    addComp.result.then((result) => {
      if(result === 'success') {
        this.toaster.showToaster({
          state: this.toaster.STATE.SUCCESS,
          info:'页面创建成功'
        })
        this.initData();
      }else {
      
      }
  
    }, (reason) => {
      this.toaster.showToaster({
        state: this.toaster.STATE.ERROR,
        info:'页面创建失败'
      })
    });
  }

  editorCurrentPage(event) {
    let comp = this.modalService.open(PageEditComponent);
    comp.componentInstance.datas = {
      state:'editorPage',
      page:event
    };
    comp.result.then((result) => {
      if(result === 'success') {
        this.toaster.showToaster({
          state: this.toaster.STATE.SUCCESS,
          info:'页面名称更新成功'
        })
        this.initData();
      }else {
      
      }
  
    }, (reason) => {
      this.toaster.showToaster({
        state: this.toaster.STATE.ERROR,
        info:'页面名称更新成功'
      })
    });
  }

  delCurrentPage(page) {
    let id = page['id'];
    if(id !== null) {
      this.sweet.deleteAlert().then(res => {
        if(res['value']) {
          let url = 'page/' + id;
          this.delete(null, url).subscribe(res => {
            this.initData();
            this.toaster.showToaster({
              state: this.toaster.STATE.SUCCESS,
              info:'页面删除成功'
            })
          })
        }
      })
    }
  }
}

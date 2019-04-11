import { Injectable } from '@angular/core';

@Injectable()
export class MenuBreadCrumbService {
    private menu: any;
    constructor() {
        this.initData();
    }

    initData() {
        this.menu = [
            { name: '首页',path: './home', children:[]},
            { name: '开发',path: './develope', children:[]},
            { name: '设置',path: './config', children:[]},
        ]
    }

    getMenuBreadCrumbs() {
        return this.menu;
    }
}
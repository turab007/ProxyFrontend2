import { Component } from '@angular/core';
import { ProxyService } from '../../proxy.service';
import { Proxy } from '../../proxy';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {SwitchesComponent} from './switches.component';

@Component({
  templateUrl: 'tables.component.html'
})
export class TablesComponent {

  bsModalRef: BsModalRef;
  data: Proxy[];
  displayData: Proxy[];
  pages: number = 0;
  pageArray: number[];
  pageNumber: number = 1;

  constructor(public proxyService: ProxyService, private modalService: BsModalService) {
    this.proxyService.getProxies().subscribe(res => {
      this.data = res;
      this.pages = (res.length - (res.length % 10)) / 10;
      this.pageArray = new Array(this.pages);
      this.pagination(1);
    });

  }

  openModalWithComponent() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(SwitchesComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  pagination(page: number) {
    // let x = this.total / 30;
    page--;
    this.displayData = this.data.slice(page * 10, (page + 1) * 10);
  }

}

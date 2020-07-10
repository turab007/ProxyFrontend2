import { Component } from '@angular/core';
import { ProxyService } from '../../proxy.service';
import { Proxy } from '../../proxy';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SwitchesComponent } from './switches.component';
import { Router } from '@angular/router';
import { error } from 'protractor';

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
  totalElements;
  error = false;
  success = false;

  constructor(public proxyService: ProxyService, private modalService: BsModalService,
    public router: Router) {
    this.getProxies();

  }
  getProxies() {
    this.data=[];
    this.proxyService.getProxies().subscribe(res => {
      this.data = res;
      this.totalElements = res.length;
      this.pages = (res.length - (res.length % 10)) / 10;
      this.pageArray = new Array(this.pages);
      this.pagination(1);
    }, error => {
    });

  }

  openModalWithComponent(proxy: Proxy) {
    console.log('My daya ');
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(SwitchesComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  pagination(page: number) {
    // let x = this.total / 30;
    page--;
    this.displayData = this.data.slice(page * 10, (page + 1) * 10);
  }

  delete(ip) {
    console.log('delete', ip);
    this.proxyService.delete(ip).subscribe((res) => {
      this.getProxies();
    });

  }

  refresh() {
    this.proxyService.refresh().subscribe(res => {
      this.success = true;
      console.log('Set timeout');
      setTimeout(() => {
        this.success = false;
        this.getProxies();
      }, 5000);
    }, error => {
      console.log('Error');
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);

    });
  }
  showTests(ip: string) {
    this.router.navigate([`base/switches/${ip}`]);
  }

}

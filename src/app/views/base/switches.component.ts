import { Component, Input } from '@angular/core';
import { ProxyService } from '../../proxy.service';
import { UrlTest } from '../../urlTest';
import { Proxy } from '../../proxy';

@Component({
  templateUrl: 'switches.component.html',
})
export class SwitchesComponent {
  data: UrlTest[];
  @Input() test: Proxy;
  @Input() title;
  url;

  constructor(private proxyService: ProxyService) {
    console.log('initial ', this.title);
    this.proxyService.getTests('104.28.4.126').subscribe(res => {
      this.data = res;
    });
  }

  doTests() {
    // this.proxyService.doTests().subscribe(res => {

    // })

  }

}

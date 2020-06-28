import { Component, Input } from '@angular/core';
import { ProxyService } from '../../proxy.service';
import { UrlTest } from '../../urlTest';
import { Proxy } from '../../proxy';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'switches.component.html',
})
export class SwitchesComponent {
  data: UrlTest[];
  @Input() test: Proxy;
  @Input() title;
  url = '';
  ip;

  constructor(private proxyService: ProxyService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      console.log('Params', params.ip);
      this.ip = params.ip;
      this.proxyService.getTests(params.ip).subscribe(res => {
        this.data = res;
      });
    });
    console.log('initial ', this.title);
  }

  doTests() {
    console.log('Thisis url', this.url);
    this.proxyService.doTests('Google.com', ip).subscribe(res => {

    })

  }

}

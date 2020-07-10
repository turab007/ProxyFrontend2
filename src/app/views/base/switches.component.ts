import { Component, Input } from '@angular/core';
import { ProxyService } from '../../proxy.service';
import { UrlTest } from '../../urlTest';
import { Proxy } from '../../proxy';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: 'switches.component.html',
})
export class SwitchesComponent {
  data: UrlTest[];
  @Input() test: Proxy;
  @Input() title;
  // url = '';
  url = new FormControl('');
  ip;

  constructor(private proxyService: ProxyService, private activatedRoute: ActivatedRoute) {
    this.getResullts();
  }

  getResullts() {
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
    this.proxyService.doTests(this.url.value, this.ip).subscribe(res => {
      this.getResullts();

    }, err => {
      console.log('error ', err);
      this.getResullts();
    })

  }

}

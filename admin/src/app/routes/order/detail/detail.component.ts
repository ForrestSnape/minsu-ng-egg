import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'order-detail',
  templateUrl: './detail.component.html',
})
export class OrderDetailComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}

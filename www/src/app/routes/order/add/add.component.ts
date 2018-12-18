import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'order-add',
  templateUrl: './add.component.html',
})
export class OrderAddComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}

import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'order-edit',
  templateUrl: './edit.component.html',
})
export class OrderEditComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}

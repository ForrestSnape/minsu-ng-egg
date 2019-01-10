import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'town-add',
  templateUrl: './add.component.html',
})
export class TownAddComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}

import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'room-edit',
  templateUrl: './edit.component.html',
})
export class RoomEditComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}

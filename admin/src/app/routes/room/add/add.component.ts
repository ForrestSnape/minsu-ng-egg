import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'room-add',
  templateUrl: './add.component.html',
})
export class RoomAddComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}

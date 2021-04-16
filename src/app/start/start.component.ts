import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TestServiceService } from '../test-service.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartComponent implements OnInit {

  constructor(public testService: TestServiceService) { 
    console.log("Start ctor");
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log("Start destroyed");
  }

}
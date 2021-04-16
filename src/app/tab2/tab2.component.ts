import { Component, OnInit, Inject } from '@angular/core';
import { Greeter } from '../injectors/greeting.injector';
import { TabCommunicator } from '../injectors/tab-communication.injector';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.css']
})
export class Tab2Component implements OnInit {

  constructor(@Inject (Greeter) private greeting: string, @Inject (TabCommunicator) private tabCommunicator: TabCommunicator) {
    console.log("Tab2 ctor");
   }

  public dataToSend: string;

  ngOnInit() {
    // this.tabCommunicator.communicationData.subscribe(data=> this.dataToSend = data);
  }

  sendData(data: string){
    
    // this.tabCommunicator.communicationData.next(this.dataToSend);
  }

  ngOnDestroy(){
    console.log("Tab2 destroyed");
  }

}
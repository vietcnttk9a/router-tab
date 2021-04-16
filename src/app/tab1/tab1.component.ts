import { Component, OnInit, Inject } from "@angular/core";
import { TabCommunicator } from "../injectors/tab-communication.injector";
import { TestServiceService } from "../test-service.service";
import { CurrentTabInjector } from "../app.component";

@Component({
  selector: "app-tab1",
  templateUrl: "./tab1.component.html",
  styleUrls: ["./tab1.component.css"]
})
export class Tab1Component implements OnInit {
  constructor(
    @Inject(TabCommunicator) private tabCommunicator: TabCommunicator,
    // @Inject(CurrentTabInjector) private tabInjector: CurrentTabInjector,
    public testService: TestServiceService
  ) {
    console.log("Tab1 ctor");
  }

  public count = -1;

  ngOnInit() {
     this.tabCommunicator.communicationData.subscribe(data => {
      console.log("Tab1: Got new data ", data);
      // this.count += 1;
      // this.tabInjector.currentTab.count.next(this.count);
    });
  }

  ngOnDestroy() {
    console.log("Tab1 destroyed");
  }
}

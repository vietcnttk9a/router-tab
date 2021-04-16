import {
  Component,
  Injector,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Injectable
} from "@angular/core";
import {
  ActivatedRoute,
  Router,
  RoutesRecognized,
  Route
} from "@angular/router";

import { Greeter } from "./injectors/greeting.injector";
import { TabCommunicator } from "./injectors/tab-communication.injector";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CurrentTabInjector {
  public currentTab: Tab;
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public tabs: Tab[] = [];
  public routes: Route[] = [];
  public currentHoverTabKey: string;
  public currentDraggedTab: Tab;
  // public tabInjectors: TabInjector[] = [];

  myInjector: Injector;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private injector: Injector,
    private cd: ChangeDetectorRef
  ) {
    // listen to routing change event to attach new tabs or activate a new one
    router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        this.checkAndAddRouteTab(val);
      }
    });

    this.myInjector = Injector.create({
      providers: [
        { provide: Greeter, deps: [] },
        { provide: TabCommunicator, deps: [] }
      ],
      parent: this.injector
    });
  }

  ngOnInit() {
    // get all routes to mock a navigation
    this.routes = this.router.config;
  }

  disposeTab(tab: Tab) {
    if (this.tabs.length > 1) {
      this.tabs = this.tabs.filter(item => item.key !== tab.key);

      if (tab.active) {
        // deactivate all tabs
        this.deactivateTabs();
        this.router.navigateByUrl(this.tabs[this.tabs.length - 1].route.path);
      }
    }
  }

  mouseOverTab(tab: Tab) {
    this.currentHoverTabKey = tab ? tab.key : null;
  }

  checkAndAddRouteTab(val: RoutesRecognized) {
    // get the component to activate by the route
    const comp = val.state.root.firstChild.component;

    // deactivate all tabs
    this.deactivateTabs();

    // check if the tab to be activated is already existing
    if (this.tabs.find(tab => tab.name == comp["name"]) == null) {

      // if not, push it into the tab array
      this.tabs.push({
        name: comp["name"],
        component: comp,
        key: comp["name"],
        active: true,
        route: val.state.root.firstChild.routeConfig,
        count: new BehaviorSubject<number>(0)
      });

    } else {
      // if the tab exists, activate it
      const tabToActivate = this.tabs.find(tab => tab.name == comp["name"]);
      if (tabToActivate) {
        tabToActivate.active = true;
      }
    }

    this.cd.markForCheck();
  }

  deactivateTabs() {
    this.tabs.forEach(tab => (tab.active = false));
  }

  // getTabInjector(tabKey: string): Injector {
  //   return this.tabInjectors.find(tab => tab.tabKey == tabKey).injector;
  // }
}

// export type TabInjector = { tabKey: string; injector: Injector };

export interface Tab {
  name: string;
  component: any;
  active: boolean;
  route: Route;
  key: string;
  count: BehaviorSubject<number>;
}

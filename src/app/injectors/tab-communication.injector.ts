// Injector to get data into the component
import { Injector, Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TabCommunicator {
  public communicationData = new BehaviorSubject<string>('Initiale daten') ;
}

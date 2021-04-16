import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TestServiceService {

  constructor() { }

  public testProp: string = 'testProp';
  public testPropObs$ = new BehaviorSubject<string>('testPropObs$');

}
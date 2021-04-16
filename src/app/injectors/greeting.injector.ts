// Injector to get data into the component
import { Injector, Injectable } from "@angular/core";

@Injectable()
export class Greeter {
  hello = "Marco!";
}

import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AngularComponentService {
  batchSize = 10000;
  components: number[] = [];

  get appendedTotal() {
    return this.components.length;
  }

  append() {
    for (let i = 0; i < this.batchSize; i++) {
      this.components.push(i);
    }
  }

  clear() {
    this.components = [];
  }
}

import {Component, View} from 'angular2/angular2';
import {For} from 'angular2/directives';
import {bind} from 'angular2/di';

import {Model, FakeModel} from 'src/model/model';
import {Scope} from 'src/model/scope';
import {Ticker, IntervalTicker, TICK_INTERVAL_MS} from 'src/model/ticker';
import {TreeComponent} from 'src/components/tree/tree-component';

var injectorBindings = [
  bind(Model).toClass(FakeModel),
  bind(Ticker).toClass(IntervalTicker),
  bind(TICK_INTERVAL_MS).toValue(100)
];

@Component({
  selector: 'app',
  injectables: injectorBindings
})
@View({
  templateUrl: 'src/components/app/template.html',
  directives: [TreeComponent]
})
export class AppComponent {
  rootScope: Scope;

  constructor(model: Model) {
    this.rootScope = model.scopes[0];
  }
}

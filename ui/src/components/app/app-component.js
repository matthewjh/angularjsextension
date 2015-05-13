import {Component, View} from 'angular2/angular2';
import {bind} from 'angular2/di';

import {Model, FakeModel} from 'src/model/model';
import {Ticker, IntervalTicker, TICK_INTERVAL_MS} from 'src/model/ticker';

var injectorBindings = [
  bind(Model).toClass(FakeModel),
  bind(Ticker).toClass(IntervalTicker),
  bind(TICK_INTERVAL_MS).toValue(10)
];

@Component({
  selector: 'app',
  injectables: injectorBindings
})
@View({
  templateUrl: 'src/components/app/template.html'
})
export class AppComponent {
  constructor(model: Model) {
    console.log(model);
  }
}

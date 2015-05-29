import {TreeComponent} from 'src/components/tree/tree-component';

import {Component, View} from 'angular2/angular2';
import {TestBed} from 'angular2/src/test_lib/test_bed';
import {DOM} from 'angular2/src/dom/dom_adapter';
import {
  AsyncTestCompleter,
  describe,
  it,
  inject
} from 'angular2/test_lib';

export function main () {
  describe('tree component directive', () => {

    it('should render the correct template', inject([AsyncTestCompleter, TestBed], (async, tb) => {
      var html = '<tree></tree>';

      tb.createView(TestComponent, {html: html}).then((view) => {
        view.detectChanges();

        expect(DOM.getText(view.rootNodes[0])).toEqual('insert tree here');

        async.done();
      });
    }));
  });
};

@Component()
@View({
  directives: [TreeComponent]
})
class TestComponent {}

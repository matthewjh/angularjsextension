import {AppComponent} from 'src/components/app/app-component';

import {Component, View} from 'angular2/angular2';
import {TestBed} from 'angular2/src/test_lib/test_bed';
import {DOM} from 'angular2/src/dom/dom_adapter';
import {XHR} from 'angular2/src/services/xhr';
import {
  AsyncTestCompleter,
  describe,
  it,
  inject
} from 'angular2/test_lib';

export function main () {
  describe('app component directive', () => {

    xit('should render the correct template', inject([AsyncTestCompleter, TestBed, XHR], (async, tb, xhr) => {
      var html = '<app></app>';

      tb.createView(TestComponent, {html: html}).then((view) => {
        view.detectChanges();

        expect(DOM.getText(view.rootNodes[0])).toEqual('hi');

        async.done();
      });
    }));
  });
};

@Component()
@View({
  directives: [AppComponent]
})
class TestComponent {}

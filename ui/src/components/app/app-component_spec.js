import {AppComponent} from 'src/components/app/app-component';

import {TestBed} from 'angular2/src/test_lib/test_bed';
import {DOM} from 'angular2/src/dom/dom_adapter';
import {
  describe,
  it,
  AsyncTestCompleter,
  inject
} from 'angular2/test_lib';

export function main () {
  describe('app component directive', () => {

    it('should render the correct template', inject([AsyncTestCompleter, TestBed], (async, tb) => {
      var html = '<app></app>';

      tb.createView(AppComponent, {html: html}).then((view) => {
        view.detectChanges();

        expect(DOM.getText(view.rootNodes[0])).toEqual('hi');

        async.done();
      });
    }));
  });
};

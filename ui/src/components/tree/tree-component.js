import {Component, View} from 'angular2/angular2';
import {For} from 'angular2/directives';
import {Scope} from 'src/model/scope';

@Component({
  selector: 'tree',
  properties: {
    root: 'root'
  }
})
@View({
  directives: [For, TreeComponent],
  template: `
    <div>
      {{root.id}}
      <div *for="#child of children" [root]="child">{{child.id}}</div>
    </div>
    `
})
export class TreeComponent {
  root: Scope;

  get children(): Array<Scope> {
    var children: Array<Scope> = [],
        currentScope = this.root && this.root.childHead;

    while (currentScope) {
      children.push(currentScope);

      currentScope = currentScope.nextSibling;
    }

    return children;
  }
}

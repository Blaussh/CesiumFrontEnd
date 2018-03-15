import { Component, Output, EventEmitter, Input } from '@angular/core';

// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs/Observable';
// import * as NavigationActions from '../../actions/navigation.actions';

@Component({
  selector: 'app-generic-selector',
  templateUrl: 'generic.selector.component.html',
  styleUrls: ['generic.selector.component.css']
})

export class GenericSelectorComponent {

  @Input('values') values: any;
  @Output() selectionChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  onSelectionChanged(event) {
    this.selectionChanged.emit(event.target.selectedIndex);
  }

}

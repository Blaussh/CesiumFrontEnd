import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contextmenu',
  templateUrl: 'context.menu.component.html',
  styleUrls: ['context.menu.component.css']
})

export class ContextmenuComponent {

  constructor() { }

  @Output()
  deleteEntity = new EventEmitter();

  @Output()
  changeImg = new EventEmitter<string>();

  @Output()
  setMoveable = new EventEmitter();

  @Input()
  x = 0;

  @Input()
  y = 0;

  delete() {
    this.deleteEntity.emit();
  }

  setContextMenu(event) {
    console.log('submenu');
  }

  change(str) {
    this.changeImg.emit(str);
  }

  move() {
    this.setMoveable.emit();
  }
}

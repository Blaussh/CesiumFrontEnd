import { Component, AfterContentInit, OnInit } from '@angular/core';
import { ShapesService } from '../../services';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Shape } from '../../models/shape.model';
import { ChangeShape } from '../../actions/shapes.actions';
import { ImagesService } from '../../../core/services/imagesService';
// import * as NavigationActions from '../../actions/navigation.actions';
const imagesRoot = '../../../../assets/images';



interface AppState {
  shape: Shape;
}

@Component({
  selector: 'app-shapes',
  templateUrl: 'shapes.component.html',
  styleUrls: ['shapes.component.css']
})


export class ShapesComponent implements OnInit {

  lastImageSource: string;
  showImage = false;
  imageSource: string;
  images = [];

  constructor(
    private store: Store<AppState>,
    private shapesService: ShapesService,
    private imagesService: ImagesService
  ) { }

  onSelectionChanged(selectedShape: number) {
    this.store.dispatch(new ChangeShape(this.imageSource));
  }

  ngOnInit(): void {
    this.images = this.imagesService.getImages();
  }

  drag(event) {
    console.log('Drag!', event);
    if (event.target.currentSrc) {
      this.imageSource = event.target.currentSrc;
    }
    if (this.lastImageSource !== this.imageSource) {
      this.lastImageSource = this.imageSource;
      this.store.dispatch(new ChangeShape(this.imageSource));
    }
  }
}

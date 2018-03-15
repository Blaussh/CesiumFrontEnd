import { Injectable } from '@angular/core';

@Injectable()
export class ShapesService {

  constructor() {}

  sayShape() {
    console.log('Shape!');
  }
}

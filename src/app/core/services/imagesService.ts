import { Injectable } from '@angular/core';

@Injectable()
export class ImagesService {
  constructor() { }
  images = [
    { id: -1, name: 'NONE', shapeSource: '' },
    { id: 0, name: 'tank', shapeSource: `../../../../assets/images/tank.jpg` },
    { id: 1, name: 'soldier', shapeSource: `../../../../assets/images/soldier.png` },
    { id: 2, name: 'aircraft', shapeSource: `../../../../assets/images/aircraft.png` }
  ];

  getImages() {
    return this.images;
  }
}

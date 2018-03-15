import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy, HostListener, Input } from '@angular/core';
// import { ShapesService } from './shapes.service';
import { MapsManagerService, ViewerConfiguration } from 'angular-cesium';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { View } from '../../models';
import { Subscription } from 'rxjs/Subscription';
import { CesiumEffects } from '../../effects';
import { ImagesService } from '../../../core/services/imagesService';

interface AppState {
  cesium: View;
}

@Component({
  selector: 'app-cesium',
  templateUrl: 'cesium.component.html',
  providers: [ViewerConfiguration],
  styleUrls: ['cesium.component.css']
})
export class CesiumComponent implements OnInit, AfterViewInit, OnDestroy {

  static imagePath;
  static pickedObject: any;
  static isCreate = false;
  static billboardImage = '../../../../asets/images/soldier.png';
  static longitudeString;
  static latitudeString;
  static canvas;
  static scene;
  static viewer;
  static entitiesForDb = [];
  static imagesRoot = '../../../../assets/images';
  static images = [];
  static contextmenu = false;
  static contextmenuX = 0;
  static contextmenuY = 0;
  static lastPickedPosition: { x: number, y: number };
  static moveableBillboard;
  static moveable = false;

  private navigateSubscription: Subscription;
  private shapesSubscription: Subscription;
  private openViewSubscription: Subscription;
  private navStore$ = this.store.select(store => store.navigate);
  private shapesStore$ = this.store.select(store => store.shapes);
  private openViewStore$ = this.store.select(store => store.openView);
  private navBarStore$ = this.store.select(store => store.navBar);
  private center;
  private cameraService;
  private handler;
  private pageLoading;

  @ViewChild('cesiumContainer') cesiumContainer: ElementRef;

  constructor(
    private store: Store<any>,
    private mapsManagerService: MapsManagerService,
    private viewerConf: ViewerConfiguration,
    private http: HttpClient,
    private imagesService: ImagesService
  ) {
    viewerConf.viewerOptions = {
      selectionIndicator: false,
      timeline: true,
      infoBox: false,
      fullscreenButton: false,
      baseLayerPicker: false,
      animation: true,
      homeButton: false,
      geocoder: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false
    };
  }

  get contextmenuY() {
    return CesiumComponent.contextmenuY;
  }

  get contextmenuX() {
    return CesiumComponent.contextmenuX;
  }

  get contextmenu() {
    return CesiumComponent.contextmenu;
  }

  get moveable() {
    return CesiumComponent.moveable;
  }

  static addEntity(x: number, y: number): void {
    const mousePosition = new Cesium.Cartesian2(x, y);
    const ellipsoid = CesiumComponent.scene.globe.ellipsoid;
    const width = CesiumComponent.canvas.clientWidth;
    const height = CesiumComponent.canvas.clientHeight;
    let shape;
    const cartesian = CesiumComponent.viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
    if (cartesian) {
      const cartographic = ellipsoid.cartesianToCartographic(cartesian);
      CesiumComponent.longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
      CesiumComponent.latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
      const altitude = height;

      if (CesiumComponent.imagePath !== undefined && CesiumComponent.imagePath !== '') {
        if (CesiumComponent.imagePath._value !== undefined) {
          shape = CesiumComponent.imagePath._value;
        } else {
          shape = CesiumComponent.imagePath;
        }
      } else {
        CesiumComponent.billboardImage = CesiumComponent.billboardImage.substring(CesiumComponent.billboardImage.lastIndexOf('/'));
        CesiumComponent.billboardImage = this.imagesRoot + CesiumComponent.billboardImage;
        shape = CesiumComponent.images[CesiumComponent.arrayObjectIndexOf(CesiumComponent.images,
          CesiumComponent.billboardImage, 'shapeSource')].shapeSource;
      }
      if (shape !== undefined) {
        const str = shape;
        const n = str.lastIndexOf('/');
        let classification = '';
        if (n !== -1) {
          classification = str.substring(n + 1);
        } else {
          classification = shape;
        }


        CesiumComponent.viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            CesiumComponent.longitudeString,
            CesiumComponent.latitudeString
          ),
          billboard: {
            image: shape, // default: undefined
            show: true, // default
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM // default: CENTER
          }
        });

        CesiumComponent.entitiesForDb.push({
          position_x: CesiumComponent.latitudeString,
          position_y: CesiumComponent.longitudeString,
          position_z: altitude,
          classification: classification,
          id: CesiumComponent.viewer.entities._entities._array[CesiumComponent.viewer.entities._entities._array.length - 1]._id
        });
      }
    }

  }

  static arrayObjectIndexOf(myArray, searchTerm, property) {
    for (let i = 0, len = myArray.length; i < len; i++) {
      if (myArray[i][property] === searchTerm) {
        return i;
      }
    }
    return -1;
  }


  ngAfterViewInit(): void {
    const x = this.cesiumContainer;
    let dragging = false;
    const pinBuilder = new Cesium.PinBuilder();
    const position = Cesium.Cartesian3.fromRadians(CesiumComponent.viewer.camera.positionCartographic.longitude,
      CesiumComponent.viewer.camera.positionCartographic.latitude, 1000);

    CesiumComponent.scene = CesiumComponent.viewer.scene;
    CesiumComponent.canvas = CesiumComponent.viewer.canvas;
    this.handler = new Cesium.ScreenSpaceEventHandler(
      CesiumComponent.viewer.scene.canvas
    );

    this.handler.setInputAction(function (click) {
      if (CesiumComponent.isCreate) {
        CesiumComponent.pickedObject = CesiumComponent.viewer.scene.pick(click.position);
        if (CesiumComponent.pickedObject.id._id === CesiumComponent.moveableBillboard._id && CesiumComponent.moveable) {
          if (Cesium.defined(CesiumComponent.pickedObject) && (CesiumComponent.pickedObject.id._billboard.image !== '' &&
            CesiumComponent.pickedObject.id._billboard.image !== undefined)) {
            CesiumComponent.imagePath = CesiumComponent.pickedObject.id._billboard.image;
            CesiumComponent.pickedObject.id._billboard = 1.2;
            dragging = true;
            CesiumComponent.scene.screenSpaceCameraController.enableRotate = false;
            let picId;
            if (CesiumComponent.pickedObject.id !== undefined) {
              picId = CesiumComponent.pickedObject.id;
            }
            CesiumComponent.viewer.entities.remove(CesiumComponent.pickedObject.id);
            CesiumComponent.entitiesForDb.splice(CesiumComponent.arrayObjectIndexOf(CesiumComponent.entitiesForDb,
              picId._id, 'id'), 1);
          }
        } else {
          CesiumComponent.moveableBillboard = '';
          CesiumComponent.moveable = false;
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    this.handler.setInputAction(function (ev) {
      if (CesiumComponent.isCreate && Cesium.defined(CesiumComponent.pickedObject)) {
        if (CesiumComponent.moveable) {
          dragging = undefined;
          CesiumComponent.viewer.scene.screenSpaceCameraController.enableRotate = true;
          CesiumComponent.addEntity(ev.position.x, ev.position.y);
          CesiumComponent.imagePath = '';
          CesiumComponent.moveable = false;
          CesiumComponent.moveableBillboard = '';
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_UP);

    this.handler.setInputAction(function (ev) {
      console.log(ev);
      CesiumComponent.pickedObject = CesiumComponent.viewer.scene.pick(ev.position);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  @HostListener('drop', ['$event'])
  onDrop($event) {
    $event.preventDefault();
    CesiumComponent.addEntity($event.layerX, $event.layerY);
  }

  ngOnInit(): void {
    CesiumComponent.images = this.imagesService.getImages();
    this.pageLoading = true;
    CesiumComponent.viewer = new Cesium.Viewer(this.cesiumContainer.nativeElement);
    const loginPath = 'http://localhost:8080/api/view/5a0ab876340fc121000820da';

    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        // tslint:disable-next-line:max-line-length
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTk0YzgxZDlkZDE5NjQzZWM5MjJlMGYiLCJpYXQiOjE1MjEwMTg0MjMsImV4cCI6MTUyMjIyNDQyM30.an0SJcBhVZlG_Ayex0EYTNjwT5uK-4T-RsE0EjTxsUM'
      );

    this.shapesStore$.subscribe((source) => {
      CesiumComponent.billboardImage = source.name;
    });

    this.navBarStore$.subscribe((val) => {
      CesiumComponent.isCreate = val.isCreate;
    });
    const response = this.http
      .get<any>(loginPath, { headers })
      .subscribe(res => {
        console.log(res);
        CesiumComponent.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            res.centerLocation.y,
            res.centerLocation.x,
            1000
          )
        });
        return res;
      });

    this.openViewSubscription = this.openViewStore$.map(state => state.viewData).subscribe(data => {
      if (!this.pageLoading) {

        if (data.viewData !== undefined) {
          const t = 0;
          CesiumComponent.entitiesForDb = [];
          CesiumComponent.viewer.entities.removeAll();

          data.viewData.items.forEach(item => {


            if (item.classification !== '') {
              let index: number;
              const n = item.classification.lastIndexOf('/');
              if (n !== -1) {
                item.classification = item.classification.substring(n + 1);
              }
              if (item.classification.indexOf('.') !== -1) {
                item.classification = item.classification.substr(0, item.classification.indexOf('.'));
              }
              for (let _i = 0; _i < CesiumComponent.images.length; _i++) {
                if (CesiumComponent.images[_i].name === item.classification) {
                  index = _i;
                  break;
                }
              }
              CesiumComponent.billboardImage = CesiumComponent.images[index].shapeSource;
              CesiumComponent.viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(
                  item.position_y,
                  item.position_x
                ),
                billboard: {
                  image: CesiumComponent.billboardImage, // default: undefined
                  show: true, // default
                  horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM // default: CENTER
                }
              });

              CesiumComponent.entitiesForDb.push({
                position_x: item.position_x,
                position_y: item.position_y,
                position_z: item.position_z,
                classification: item.classification,
                id: CesiumComponent.viewer.entities._entities._array[CesiumComponent.viewer.entities._entities._array.length - 1]._id
              });
            }
          });
          CesiumComponent.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
              data.viewData.centerLocation.y,
              data.viewData.centerLocation.x,
              1000.0
            )
          });
        }
      }
      this.pageLoading = false;
    });
    this.navigateSubscription = this.navStore$.map(navState => navState.center).subscribe(val => {
      this.center = val;
      if (CesiumComponent.viewer) {
        console.log(this.center);
        CesiumComponent.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            this.center.longitude,
            this.center.latitude,
            1000
          )
        });
      }
    });
  }

  ngOnDestroy(): void {
    CesiumComponent.viewer.entities.removeAll();
    CesiumComponent.entitiesForDb = [];
  }

  allowDrop(event) {
    event.preventDefault();
  }

  disableContextMenu() {
    console.log(CesiumComponent.contextmenu);
    CesiumComponent.contextmenu = false;
    if (CesiumComponent.contextmenu) {
      CesiumComponent.contextmenu = false;
    }
  }

  setContextMenu(e) {
    if (CesiumComponent.isCreate) {
      console.log(e);
      if (Cesium.defined(CesiumComponent.pickedObject) && (CesiumComponent.pickedObject.id._billboard.image !== '' &&
        CesiumComponent.pickedObject.id._billboard.image !== undefined)) {
        CesiumComponent.contextmenu = true;
        CesiumComponent.contextmenuX = e.x;
        CesiumComponent.contextmenuY = e.y;
        CesiumComponent.lastPickedPosition = { x: e.layerX, y: e.layerY + 50 };
      }
    }
  }

  deleteEntity(event) {
    const pickedObject = CesiumComponent.pickedObject.id;
    CesiumComponent.viewer.entities.remove(pickedObject);
    console.log('delete!!!');
    let picId;
    if (pickedObject !== undefined) {
      picId = pickedObject.id;
    }
    CesiumComponent.entitiesForDb.splice(CesiumComponent.arrayObjectIndexOf(CesiumComponent.entitiesForDb,
      picId, 'id'), 1);
  }

  changeImg(event) {
    let index = -1;
    const pickedObject = CesiumComponent.pickedObject.id;
    CesiumComponent.viewer.entities.remove(pickedObject);
    console.log('delete!!!');
    let picId;
    if (pickedObject !== undefined) {
      picId = pickedObject.id;
    }
    CesiumComponent.entitiesForDb.splice(CesiumComponent.arrayObjectIndexOf(CesiumComponent.entitiesForDb,
      picId, 'id'), 1);

    for (let _i = 0; _i < CesiumComponent.images.length; _i++) {
      if (CesiumComponent.images[_i].name === event) {
        index = _i;
        break;
      }
    }
    // pickedObject._billboard._image = CesiumComponent.images[index].shapeSource;
    CesiumComponent.billboardImage = CesiumComponent.images[index].shapeSource;
    CesiumComponent.addEntity(CesiumComponent.lastPickedPosition.x, CesiumComponent.lastPickedPosition.y);
    console.log(event);
  }

  setMoveable(event) {
    CesiumComponent.moveableBillboard = CesiumComponent.pickedObject.id;
    CesiumComponent.moveable = true;
    console.log('moveable');
  }
}

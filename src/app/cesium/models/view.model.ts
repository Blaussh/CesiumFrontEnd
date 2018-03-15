export interface View {
  id: number;
  viewName: {
    type: String
  };
  centerLocation: {
    x: Number,
    y: Number
  };
  items: [ {position_x: Number, position_y: Number, position_z: Number, classification: String}];
}

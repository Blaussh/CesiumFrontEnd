export interface View {
 viewData:
  {
     id: string;
     viewName: {
      type: String
      };
  centerLocation: {
    x: number,
    y: number
  };
  items: [ {position_x: Number, position_y: Number, position_z: Number, classification: String}];
};
}

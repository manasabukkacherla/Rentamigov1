import { Schema, model, models, Document } from "mongoose";

const PropertiesSchema = new Schema({
  Property_Id: String,
  Lease_No: String,
  Property_Name: String,
  Flat_No: String,
  Locality: String,
  City: String,
});

const Properties = models.Properties || model("Properties", PropertiesSchema);
export interface IProperty {
  airConditioner?: boolean;
  bed?: boolean;
  wardrobe?: boolean;
  tv?: boolean;
  refrigerator?: boolean;
  washingMachine?: boolean;
  microwave?: boolean;
  sofa?: boolean;
  diningTable?: boolean;
  gasConnection?: boolean;
  playStation?: boolean;
  lift?: boolean;
  powerBackup?: boolean;
  security?: boolean;
  cctv?: boolean;
  gym?: boolean;
  swimmingPool?: boolean;
  kidsPool?: boolean;
  jacuzzi?: boolean;
  clubHouse?: boolean;
  joggingTrack?: boolean;
  childrenPlayArea?: boolean;
  badmintonCourt?: boolean;
  lawnTennisCourt?: boolean;
  tableTennis?: boolean;
  squashCourt?: boolean;
  foosball?: boolean;
  steamRoom?: boolean;
  carrom?: boolean;
  chessBoard?: boolean;
  multipurposeHall?: boolean;
  yogaMeditationCenter?: boolean;
  flowerPark?: boolean;
  dayToUtilityStores?: boolean;
  thaiMassageParlor?: boolean;
  salon?: boolean;
}
export interface IProperty {
  [key: string]: any;
}

// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
import {ICoordinates} from "../types/IGeography";

export const getDistanceFromLatLon = (from: ICoordinates, to: ICoordinates) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(to.lat - from.lat);  // deg2rad below
  const dLon = deg2rad(to.lon - from.lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(from.lat)) * Math.cos(deg2rad(to.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round((R * c) * 1000); // Distance in meters
}



function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

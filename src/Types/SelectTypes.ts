/* Types and Interfaces for the <select> fields */

/* <select> tags */
export enum ESelectorIDs {
  palletStorageLocation = "palletStorageLocation",
  bulkStorageLocation = "bulkStorageLocation",
  bundle = "bundle",
  wastedBy = "wastedBy",
}

/* <select> <option> type definition */
export type TSelectorOption = {
  text: string,
  value: string
}

/* <select> <option> options */
export const SelectorOptions = {
  get testCenter() {
    return ({text: "TestCenter", value: "testCenter"})
  },
  get laboratory() {
    return ({text: "Laboratory", value: "laboratory"})
  },
  get outsideWarehouse() {
    return ({text: "Outside Warehouse", value: "outsideWarehouse"})
  },
  get testTower() {
    return ({text: "TestTower", value: "testTower"})
  },
  get cardBoard() {
    return ({text: "Cardboard", value: "cardBoard"})
  },
  get barrel() {
    return ({text: "Barrel", value: "barrel"})
  },
  get bucket() {
    return ({text: "Bucket", value: "bucket"})
  },
  get bigBag() {
    return ({text: "BigBag", value: "bigBag"})
  },
  get custom() {
    return ({text: "Custom", value: "custom"})
  },
  get clientPickup() {
    return ({text: "Client Pickup", value: "clientPickup"})
  },
  get retoureOnOrder() {
    return ({text: "Retoure on Order ", value: "retoureOnOrder"})
  },
  get referenceProduct() {
    return ({text: "Reference product", value: "referenceProduct"})
  },
  get houseGarbage() {
    return ({text: "House garbage", value: "houseGarbage"})
  },
  get disposalWithTC() {
    return ({text: "Disposal with TC", value: "disposalWithTC"})
  },
  get takeAwayFieldService() {
    return ({text: "Take away field service", value: "takeAwayFieldService"})
  },
  get other() {
    return ({text: "Other", value: "other"})
  },
}
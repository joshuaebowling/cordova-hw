import { string, number } from "prop-types";
interface ILocator {
  new(id: number, name:string, image:string)
  name: string,
  id: number,
  image: string
}
export default class Locator<ILocator> {
  constructor(id:number, name:string = "", image: string = "") {
    this.name = name;
    this.id = id;
    this.image = image;
  }
  name: string
  id: number
  image: string
}

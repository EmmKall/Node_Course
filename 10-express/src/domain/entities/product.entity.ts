import { CustomError } from "../errors/custom.error";

export class ProductEntity {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public categoryId: number
  ) {}

  static toObject(object: { [key: string]: any }): ProductEntity {
    const { id, name, description, price, stock, categoryId } = object;
    if (!name) throw CustomError.badRequest("Name is required");
    if (!description) throw CustomError.badRequest("Description is required");
    if (!price) throw CustomError.badRequest("Price is required");
    if (!stock) throw CustomError.badRequest("Stock is required");
    if (!categoryId) throw CustomError.badRequest("Category id is required");

    return new ProductEntity(id, name, description, price, stock, categoryId);
  }
}


import { CustomError } from "../errors/custom.error";

export class CategoryEntity {
  constructor(
    public id: number,
    public name: string,
    public available: boolean
  ) {}

  static toOject(object: { [key: string]: any }): CategoryEntity {
    const { id, name, available } = object;

    if (!id) throw CustomError.badRequest("Id is required");
    if (!name) throw CustomError.badRequest("Name is required");
    if (available === undefined)
      throw CustomError.badRequest("Available is required");

    return new CategoryEntity(id, name, available);
  }
}

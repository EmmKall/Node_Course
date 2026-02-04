import { error } from "console";
import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, DestroyCategoryDto, FindCategoryDto, PaginationDto, UpdateCategoryDto } from "../../domain";


export class CategoryService {
  //DI
  constructor() {}

  public async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto.fromObject();
    try {
      const data = await CategoryModel.find()
      .skip((page - 1) * limit)
      .limit(limit * 1);
      if(!data) throw CustomError.badRequest(`Categories not found`);
      return {error: false, data};
    }catch(err) {
      // console.log(err);
      return { error: true, message: 'Unexpected error' };
    }
  }

  public async getCategoryById(categoryFindDto: FindCategoryDto) {
    const { id } = categoryFindDto.fromObject();
    const category = await CategoryModel.findById(id);
    if(!category) throw CustomError.badRequest(`Category with id ${id} not found`);
    return {error: false, data: category};
  }

  public async createCategory(createCategoryDto: CreateCategoryDto) {
    const {name, user, isAvailable} = createCategoryDto.fromObject();
    try {
        const category = new CategoryModel({name, user, isAvailable});
        await category.save();
        return {error: false, data: category};
    }catch(err) {
        throw CustomError.internalError(`${err}`);
    }
  }

  public async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const { id, name, isAvailable, user } = updateCategoryDto.fromObject();
    try {
        const category = await CategoryModel.findByIdAndUpdate(id, {name, isAvailable, user}, {new: true,runValidators: true});
        if(!category) throw CustomError.badRequest(`Category with id ${id} not found`);
        return {error: false, data: category};
    }catch(err) {
        throw CustomError.internalError(`${err}`);
    }
  }

  public async deleteCategory(destroyCategoryDto: DestroyCategoryDto) {
    const {id} = destroyCategoryDto.fromObject();
    try {
        const category = await CategoryModel.findByIdAndDelete(id);
        if(!category) throw CustomError.badRequest(`Category with id ${id} not found`);
        return {error: false, msg: 'Category was deleted sucessfully'};
    }catch(err) {
        throw CustomError.internalError(`${err}`);
    }
  }

}

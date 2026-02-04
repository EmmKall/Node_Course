import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, DestroyProductDto, FindProductDto, PaginationDto, UpdateProductDto } from "../../domain";

export class ProductService {

    //DI
    constructor(){}

    public async getProducts(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto.fromObject();
        try {
          const data = await ProductModel.find()
            .skip((page - 1) * limit)
            .limit(limit * 1)
            .populate('user', 'name email')
            .populate('category', 'name');
          if (!data) throw CustomError.notFound("Products not found");
          return { data };
        } catch (err) {
          // console.log(err);
          return { error: true, message: "Unexpected error" };
        }
    }

    public async getProductById(findProductDto: FindProductDto) {
        const { id } = findProductDto.fromObject();
        const data = await ProductModel.findById(id).populate('user', 'name').populate('category', 'name');
        if(!data) throw CustomError.notFound("Product not found");;
        return {error: false, data};
    }

    public async createProduct(createProductDto: CreateProductDto) {
        const {name,isAvailable,price,description,user,category,img} = createProductDto.fromObject();
        try {
            const product = new ProductModel({name,isAvailable,price,description,user,category,img});
            await product.save();
            return {error: false, data: product};
        } catch(err) {
            throw CustomError.internalError(`${err}`);
        }
    }

    public async updateProduct(updateProductDto: UpdateProductDto) {
        const {id, name, isAvailable, price, description, user, category, img} = updateProductDto.fromObject();
        try {
            const data = await ProductModel.findByIdAndUpdate(id, {name, isAvailable, price, description, user, category, img}, {new: true});
            if(!data) throw CustomError.notFound("Product not found");
            return {error: false, data};
        }catch(err) {
            throw CustomError.internalError(`${err}`);
        }
    }

    public async destroyProduct(destroyProductDto: DestroyProductDto) {
        const {id} = destroyProductDto.fromObject();
        try {
            const data = await ProductModel.findByIdAndDelete(id);
            if(!data) throw CustomError.notFound("Product not found");
            data.deleteOne();
            return {error: false, msg: 'Product was deleted successfully'};
        }catch(err) {
            throw CustomError.internalError(`${err}`);
        }
    }


}

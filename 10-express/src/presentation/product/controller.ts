import { Request, Response } from "express";
import { CreateProductDto, CustomError, DestroyProductDto, FindProductDto, PaginationDto, UpdateProductDto } from "../../domain";
import { ProductService } from "../services/product.service";
// import { AuthService } from "../services/auth.service";
// import { LoginUserDto } from "../../domain/dtos/auth/user-login.dto";
// import { VerifyUserDto } from "../../domain/dtos/auth/user-verify.tdo";

export class ProductController {

    constructor(
        private readonly productService: ProductService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: true, message: error.message });
        }
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }

    getProducts = (req: Request, res: Response) => {

        const {page = 1, limit = 5} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) this.handleError(error, res);

        this.productService.getProducts(paginationDto!)
        .then((data) => res.json(data))
        .catch(error => this.handleError(error, res));        
    }

    getById = (req: Request, res: Response) => {
        const [error, findProductDto] = FindProductDto.create(req.params);
        if(error) this.handleError(error, res);
        this.productService.getProductById(findProductDto!)
        .then((data) => res.json(data))
        .catch(error => this.handleError(error, res));
    }

    storeProduct = (req: Request, res: Response) => {
        const [error, createProductDto] = CreateProductDto.create(req.body);
        if(error) this.handleError(error, res);
        this.productService.createProduct(createProductDto!)
        .then((data) => res.status(201).json(data))
        .catch(error => this.handleError(error, res));
    }

    updateProduct = (req: Request, res: Response) => {
        const [error, updateProductDto] = UpdateProductDto.create({...req.body, ...req.params});
        if(error) this.handleError(error, res);
        this.productService.updateProduct(updateProductDto!)
        .then((data) => res.json(data))
        .catch(error => this.handleError(error, res));
    }

    destroyProduct = (req: Request, res: Response) => {
        const [error, destroyProductDto] = DestroyProductDto.create(req.params);
        if(error) this.handleError(error, res);
        this.productService.destroyProduct(destroyProductDto!)
        .then((data) => res.json(data))
        .catch(error => this.handleError(error, res));
    }

}

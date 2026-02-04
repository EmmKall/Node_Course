import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, DestroyCategoryDto, FindCategoryDto, PaginationDto, UpdateCategoryDto } from "../../domain";
import { CategoryService } from "../services/category.service";

export class CategoryController {

    constructor(
        public readonly categoryService: CategoryService,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: true, message: error.message });
        }
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }

    getCategories = (req: Request, res: Response) => {

        const {page = 1, limit = 5} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) this.handleError(error, res);

        this.categoryService.getCategories(paginationDto!)
        .then((data) => res.json(data))
        .catch(error => this.handleError(error, res));
    }

    getCategoryById = (req: Request, res: Response) => {
        const [error, findCategoryDto] = FindCategoryDto.create(req.params);
        if (error) this.handleError(error, res);
        this.categoryService.getCategoryById(findCategoryDto!)
        .then((data) => res.json(data))
        .catch(error => this.handleError(error, res));
    }

    storeCategory = (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
        if (error) this.handleError(error, res);
        this.categoryService.createCategory(createCategoryDto!)
        .then((data) => res.status(201).json(data))
        .catch(error => this.handleError(error, res));
    }

    updateCategory = (req: Request, res: Response) => {
        const [error, updateCategoryDto] = UpdateCategoryDto.create({...req.body, ...req.params});
        if(error) this.handleError(error, res);
        this.categoryService.updateCategory(updateCategoryDto!)
        .then((data) => res.json(data))
        .catch(error => this.handleError(error, res));
    }

    destroyCategory = (req: Request, res: Response) => {
        const [error, destroyCategoryDto] = DestroyCategoryDto.create(req.params);
        if(error) this.handleError(error, res);
        this.categoryService.deleteCategory(destroyCategoryDto!)
        .then((data) => res.json(data))
        .catch(error => this.handleError(error, res));
    }

}

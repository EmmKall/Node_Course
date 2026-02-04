import { Validators } from "../../../config";

export class CreateProductDto {

    private constructor(
        private readonly name: string,
        private readonly isAvailable: boolean,
        private readonly price: number,
        private readonly description: string,
        private readonly user: string,
        private readonly category: string,
        private readonly img: [string],
    ) {
    }

    public static create(object: {[key: string]: any}): [string?, CreateProductDto?]{
        const {name, isAvailable, price, description, user: {id: user}, category, img} = object;

        if(!name) return ['Name is required', undefined];
        if(!price) return ['Price is required', undefined];
        if(!user) return ['User is required', undefined];
        if(!Validators.isMongoID(user)) return ["User must be a valid id", undefined];
        if(!description) return ['Description is required', undefined];
        if(!category) return ['Category is required', undefined];
        if(!Validators.isMongoID(category)) return ["Category must be a valid id", undefined];
        // if(!isAvailable) return ['Availability is required', undefined];
        // if(!img) return ['Img is required', undefined];

        return [undefined, new CreateProductDto(name, isAvailable || true, price, description, user, category, img)];
    }

    public fromObject(): {[key: string]: any} {
        const {name, isAvailable, price, description, user, category, img} = this;
        return {name,isAvailable,price,description,user,category,img,};
    }

}

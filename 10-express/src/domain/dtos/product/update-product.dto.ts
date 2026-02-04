export class UpdateProductDto {

    private constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly isAvailable: boolean,
        private readonly price: number,
        private readonly description: string,
        private readonly user: string,
        private readonly category: string,
        private readonly img: [string],
    ) {}

    public static create(object: {[key: string]: any}): [string?, UpdateProductDto?] {
        const {id, name, isAvailable, price, description, user: {id: user}, category, img} = object;

        if(!id) return ['Id is required', undefined];
        if(!name) return ['Name is required', undefined];
        if(!price) return ['Price is required', undefined];
        if(!user) return ['User is required', undefined];
        if(!description) return ['Description is required', undefined];
        if(!category) return ['Category is required', undefined];
        if(!user) return ['User is required', undefined];

        return [undefined, new UpdateProductDto(id, name, isAvailable || true, price, description, user, category, img)];
    }

    public fromObject(): {[key: string]: any} {
        const {id, name, isAvailable, price, description, user, category, img} = this;
        return {id,name,isAvailable,price,description,user,category,img,};
    }

}

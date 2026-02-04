export class CreateCategoryDto {

    private constructor(
        private readonly name: string,
        private readonly user: string,
        private readonly isAvailable: boolean,
    ) { }

    static create(object: {[key: string]: any}): [string?, CreateCategoryDto?] {
        const {name, user: { id: user}, isAvailable } = object;
        if(!name) return ['Name is required', undefined];
        if (!user) return ["User is required", undefined];
        return [undefined, new CreateCategoryDto(name, user, isAvailable)];
    }

    fromObject(): {[key: string]: any} {
        const {name, user, isAvailable} = this;
        return {name, user, isAvailable};
    }

}

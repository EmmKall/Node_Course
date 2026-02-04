export class FindCategoryDto {

    private constructor(
        private readonly id: string,
    ) { }

    public static create(object: { [key: string]: any }): [string?, FindCategoryDto?] {
        const { id } = object;
        if (!id) return ["Id is required", undefined];
        return [undefined, new FindCategoryDto(id)];
    }

    fromObject(): {[key: string]: any} {
        const {id} = this;
        return {id};
    }

}

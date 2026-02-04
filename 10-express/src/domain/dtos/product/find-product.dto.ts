export class FindProductDto {

    private constructor(
        private readonly id: string,
    ) {}

    public static create(object: {[key: string]: any}): [string?, FindProductDto?] {
        const {id} = object;
        if(!id) return ['Id is required', undefined];

        return [undefined, new FindProductDto(id)];
    }

    public fromObject(): {id: string} {
        const {id} = this;
        return {id};
    }

}

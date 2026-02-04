export class DestroyProductDto {

    private constructor(
        public readonly id: string
    ){}

    public static create(object: {[key: string]: any}): [string?, DestroyProductDto?] {
        const {id} = object;
        if(!id) return ['Id is required', undefined];

        return [undefined, new DestroyProductDto(id)];
    }

    public fromObject(): {[key: string]: any} {
        const {id} = this;
        return {id};
    }

}

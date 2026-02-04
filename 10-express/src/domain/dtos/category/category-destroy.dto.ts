export class DestroyCategoryDto {

    private constructor(
        private readonly id: string,
    ) { }

    public static create(object: { [key: string]: any }): [string?, DestroyCategoryDto?] {
        const {id} = object;
        if(!id) return ['Id is required', undefined];

        return [undefined, new DestroyCategoryDto(id)];
    }

    fromObject(): {[key: string]: any} {
        const {id} = this;
        return {id};
    }

}


export class PaginationDto {

    private constructor(
        public readonly page: number,
        public readonly limit: number,
    ) {}

    public static create(page: number = 1, limit: number = 5): [string?, PaginationDto?] {
        if(isNaN(page) || page <= 0) return ['Page must be a positive number'];
        if(isNaN(limit) || limit <= 0) return ['Limit must be a positive number'];
        return [undefined, new PaginationDto(page,limit)];
    }

    public fromObject() {
        const {page, limit} = this;
        return {page, limit};
    }

}

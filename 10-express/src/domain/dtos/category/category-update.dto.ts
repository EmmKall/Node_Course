export class UpdateCategoryDto {

    private constructor(
        private          id: string,
        private readonly name: string,
        private readonly user: string,
        private readonly isAvailabe: boolean,
    ) {

    }

    static create(object: {[key: string]: any}): [string?, UpdateCategoryDto?] {
        const {id, name, user: {id: user}, isAvailabe } = object;
        if(!id) return ['Id is required', undefined];
        if(!name) return ['Name is required', undefined];
        if(!user) return ['User is required', undefined];
        return [undefined, new UpdateCategoryDto(id, name, user, isAvailabe)];
    }

    fromObject(): {[key: string]: any} {
        const {id, name, user, isAvailabe } = this;
        return {id, name, user, isAvailabe};
    }

}

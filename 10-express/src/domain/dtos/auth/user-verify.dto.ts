export class VerifyUserDto {

    private constructor(
        private readonly token: string
    ) { }

    static create(object: { [key: string]: any }): [string?, VerifyUserDto?] {
        const { token } = object;
        if (!token) return ["Token not valid"];
        return [undefined, new VerifyUserDto(token)];
    }

    static fromObject(object: { [key: string]: any }): {token: string} {
        const { token } = object;
        return {token};
    }

}

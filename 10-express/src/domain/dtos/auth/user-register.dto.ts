import { getUUID, regularExps } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public username: string,
    public email: string,
    public password: string,
    public token: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, username, email, password } = object;
    if (!name) { return ['name is required']; }
    if (!username) { return ['username is required']; }
    if (!email) { return ['email is required']; }
    if (!regularExps.email.test(email)) { return ['email is invalid']; }
    if (!password) { return ['password is required']; }
    if (password.length < 6) { return ['password must be at least 6 characters']; }
    
    const token: string = getUUID();

    return [undefined, new RegisterUserDto(name, username, email, password, token)];
  }
}

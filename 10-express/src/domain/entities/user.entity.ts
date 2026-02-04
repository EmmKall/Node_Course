import { CustomError } from '../errors/custom.error';

export class UserEntity {
    constructor(
      public readonly id: string,
    public readonly name: string = "",
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly isVerified: boolean,
    public readonly role: string[] = ["USER_ROLE"],
    public readonly avatar: string = '',
  ) {}

  static toObject(object: { [key: string]: any }): UserEntity {
    const { name, username, email, password, isVerified, avatar, role, id, _id } = object;
    if( !_id && !id ) { throw CustomError.badRequest('id is required'); }
    if( !name ) { throw CustomError.badRequest('name is required'); }
    if( !username ) { throw CustomError.badRequest('username is required'); }
    if( !email ) { throw CustomError.badRequest('email is required'); }
    if( !password ) { throw CustomError.badRequest('password is required'); }
    //if( isVerified === undefined ) { throw CustomError.badRequest('isVerified is required'); }
    if( !role ) { throw CustomError.badRequest('role is required'); }
    return new UserEntity( _id || id, name, username, email, password, isVerified, role, avatar, );
  }

}

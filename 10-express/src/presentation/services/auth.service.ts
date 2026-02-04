import { envs, hashPassword, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/user-login.dto";
import { EmailService } from "./email.service";

export class AuthService {
  //DI
  constructor(private emailService: EmailService) {}

  public async register(registerUserDto: RegisterUserDto) {
    //Valid unique email
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("Email already in use");

    try {
      //Encrypt password
      registerUserDto.password = await hashPassword.hash(registerUserDto.password, );
      
      //Create user
      const newUser = new UserModel(registerUserDto);
      await newUser.save();
      //Send validation email
      const data = {
        email: newUser.email,
        name: newUser.name,
        verificationToken: newUser.token ?? '',
      };
      await this.sendEmailVerification(data);
      const { password, ...userEntity } = UserEntity.toObject(newUser);
      return {data: userEntity,};
    } catch (err) {
      throw CustomError.internalError(`Error creating user ${err}`);
    }
  }

  public async login(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) {
      throw CustomError.notFound("User not found");
    }

    //Valid password
    const isMatchPassword = await hashPassword.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isMatchPassword) {
      throw CustomError.unauthorized("Invalid credentials");
    }

    const token = await JwtAdapter.generateToken({
      id: user._id.toString(),
      email: user.email,
    });

    const { password, ...userEntity } = UserEntity.toObject(user);
    return {
      data: userEntity,
      token,
    };
  }

  public async validateEmail(token: string) {
    const user = await UserModel.findOne({ token });
    if (!user) throw CustomError.notFound("User not found");
    user.isVerifyed = true;
    user.token = undefined;
    await user.save();
    const isSend = await this.sendWelcomeEmail(user.email, user.name);
    if(!isSend) throw CustomError.internalError("Could not send welcome email");
    const {id,name,email,role,avatar} = user;
    return {id,name,email,role,avatar};
  }

  
  private async sendEmailVerification({email, name, verificationToken}: {email: string, name: string, verificationToken: string}) {
    const url: string      = `${envs.API_URL}auth/validate-email/${verificationToken}`;
    const subject: string  = "Email Verification";
    const htmlBody: string = `
      <h1>${name}: Email Verification</h1>
      <p>Please verify your email using the following url:</p>
      <a href="${url}">Validate email, click me</a>
      <p>This link will expire in 1 hour.</p>
      <p>Email to: ${email}</p>
      <p>Thank you for registering!</p>
      <p>If you did not create an account, no further action is required.</p>
    `;
    const options = { to: email, subject, htmlBody };
    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) {
      throw CustomError.internalError("Could not send verification email");
    }
    return true;
  }

  private async sendWelcomeEmail(toEmail: string, userName: string): Promise<boolean> {
    const subject = "Welcome to Our Service!";
    const htmlBody = `
      <h1>Welcome, ${userName}!</h1>
      <p>Your account has been successfully verified.</p>
      <p>We're excited to have you on board.</p>
      <p>Thank you for registering.</p>
    `;
    const isSent = await this.emailService.sendEmail({ to: toEmail, subject, htmlBody });
    if(!isSent) throw CustomError.internalError("Could not send welcome email");
    return true;
  }

  private async sendPasswordResetEmail(toEmail: string, resetToken: string) {
    const subject = "Password Reset Request";
    const htmlBody = `<p>You requested a password reset. Use the following token to reset your password: <strong>${resetToken}</strong></p>`;
    await this.emailService.sendEmail({ to: toEmail, subject, htmlBody });
  }
}

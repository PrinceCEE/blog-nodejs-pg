export class RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class ForgotPasswordDto {
  email: string;
}

export class ChangePasswordDto {
  password: string;
  code: string;
  email: string;
}

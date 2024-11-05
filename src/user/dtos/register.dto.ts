import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { MessagesHelpers } from "../helpers/menssages.helpers";

export class RegisterDto {
 
    @IsEmail({}, { message: MessagesHelpers.AUTH_LOGIN_NOT_FOUND })
    email: string;
  
    @IsNotEmpty({ message: MessagesHelpers.AUTH_PASSWORD_NOT_FOUND })
    @MinLength(4, { message: MessagesHelpers.REGISTER_STRONG_PASSWORD })
    @MaxLength(20, { message: MessagesHelpers.REGISTER_STRONG_PASSWORD,})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: MessagesHelpers.REGISTER_STRONG_PASSWORD,
    })
    password: string;
  
    @IsNotEmpty({ message: MessagesHelpers.REGISTER_NAME_NOT_FOUND })
    @MinLength(2, { message: MessagesHelpers.REGISTER_NAME_NOT_FOUND })
    name: string;
    
    @IsString()
    avatar: string;
  }
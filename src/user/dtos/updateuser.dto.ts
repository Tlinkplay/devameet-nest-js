import { IsString, MinLength } from "class-validator";
import { MessagesHelpers } from "../helpers/menssages.helpers";

export class UpdateUserDto {
    @MinLength(2, {message: MessagesHelpers.AUTH_LOGIN_NOT_FOUND})
    name: string;

    @IsString()
    avatar: string;
}
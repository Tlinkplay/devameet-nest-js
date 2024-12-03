import { IsNotEmpty } from "class-validator";
import { RoomMessageHelper } from "../helpers/roommessages.helper";

export class JoinRoomDto {
    @IsNotEmpty({message: RoomMessageHelper.JOIN_USER_NOT_VALID})
    userId:string;

    @IsNotEmpty({message: RoomMessageHelper.JOIN_LINK_NOT_VALID})
    link:string;
}
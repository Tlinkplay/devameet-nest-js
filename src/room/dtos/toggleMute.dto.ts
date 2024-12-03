import { IsBoolean } from "class-validator";
import { JoinRoomDto } from "./joinroom.dto";
import { RoomMessageHelper } from "../helpers/roommessages.helper";

export class ToggleDto extends JoinRoomDto{

    @IsBoolean({message: RoomMessageHelper.MUTE_NOT_VALID})
    muted: boolean;
}
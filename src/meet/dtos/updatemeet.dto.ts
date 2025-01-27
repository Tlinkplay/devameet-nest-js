import { IsArray, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { CreateMeetDto } from "./createmeet.dto";
import { MeetMessagesHelper } from "../helpers/meetmessages.helper";
import { Type } from "class-transformer";
import { Meet } from "../schemas/meet.schema";

export class UpdateMeetDto extends CreateMeetDto {
    @IsArray({message: MeetMessagesHelper.UPDATE_OBEJCT_NAME_NOT_VALID})
    @Type(() => UpdateMeetObjectDto)
    @ValidateNested({each:true})
    objects: Array<UpdateMeetObjectDto>
}

export class UpdateMeetObjectDto {
    @IsNotEmpty({message: MeetMessagesHelper.UPDATE_OBEJCT_NAME_NOT_VALID})
    name: string;

    @IsNumber({},{message: MeetMessagesHelper.UPDATE_XY_VALIDATION})
    @Min(0,{message: MeetMessagesHelper.UPDATE_XY_VALIDATION})
    @Max(8,{message: MeetMessagesHelper.UPDATE_XY_VALIDATION})
    x:number;

    @IsNumber({},{message: MeetMessagesHelper.UPDATE_XY_VALIDATION})
    @Min(0,{message: MeetMessagesHelper.UPDATE_XY_VALIDATION})
    @Max(8,{message: MeetMessagesHelper.UPDATE_XY_VALIDATION})
    y:number;

    @IsNumber({}, {message: MeetMessagesHelper.UPDATE_ZINDEX_VALIDATION})
    zIndex:number;

    @IsString({message: MeetMessagesHelper.UPDATE_ORIENTATION_VALIDATION})
    orientation:string;
}
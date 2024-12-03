import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Meet } from "./meet.schema";
import mongoose, { HydratedDocument } from "mongoose";

export type MeetObejctDocumnet = HydratedDocument<MeetObejct>;

@Schema()
export class MeetObejct{

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Meet.name})
    meet: Meet;

    @Prop({required:true})
    name: string;

    @Prop({required:true})
    x: number;

    @Prop({required:true})
    y: number;

    @Prop({required:true})
    zIndex: number;

    @Prop()
    orientation: string;
}

export const MeetObejctSchema = SchemaFactory.createForClass(MeetObejct);
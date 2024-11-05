import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocumnet } from "./schemas/user.schema";
import { Model } from 'mongoose'
import { RegisterDto } from "./dtos/register.dto";
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocumnet>){}

    async create(dto: RegisterDto){
        dto.password = CryptoJS.AES.encrypt(dto.password, process.env.USER_CYPHER_SECRET_KEY).toString();

        const createdUser = new this.userModel(dto);
        await createdUser.save();
    }

    async existsByEmail(email : String) : Promise<boolean>{
        const  result = await this.userModel.findOne({email});

        if(result){
            return true;
        }

        return false;
    }
}


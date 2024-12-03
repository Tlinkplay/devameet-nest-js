import {BadRequestException, Body, Controller, Get, HttpStatus, Request, Put, HttpCode} from '@nestjs/common';
import { UserService } from './user.service';
import { MessagesHelpers } from './helpers/menssages.helpers';
import { UpdateUserDto } from './dtos/updateuser.dto';

@Controller('user')
export class UserController{
    constructor(private readonly userSerice:UserService){}

    @Get()
    async getUser(@Request() req){
        const {userId} = req?.user;
        const user = await this.userSerice.getUserById(userId);

        if(!user){
            throw new BadRequestException(MessagesHelpers.GET_USER_NOT_FOUND);
        }

        return {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            id: user._id
        }
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async updateUser(@Request() req, @Body() dto: UpdateUserDto){
        const {userId} = req?.user;
        await this.userSerice.updateUser(userId, dto);
    }
}
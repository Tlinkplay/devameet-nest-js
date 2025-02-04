import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from './dtos/joinroom.dto';
import { UpdateUserPosition } from './dtos/updateposition.dto';
import { User } from 'src/user/schemas/user.schema';
import { ToggleDto } from './dtos/toggleMute.dto';

type activeSocketType = {
  room:String;
  id:string;
  userId:string;
}

@WebSocketGateway({ cors: true})
export class RoomGateway implements OnGatewayInit, OnGatewayDisconnect {

  constructor(private readonly service:RoomService){}

  @WebSocketServer() wss: Server;

  private logger = new Logger(RoomGateway.name);
  private activeSockets: activeSocketType[] = [];

  handleDisconnect(client: any) {
    this.logger.debug(`Client ${client.id} connected`);
  }
  afterInit(server: any) {
    this.logger.log(`Geteway initialized`);
  }

  @SubscribeMessage('join')
  async handleJoin (client: Socket, payload: JoinRoomDto){
    const {link, userId} = payload;

    const existingOnSocket = this.activeSockets.find(
      socket => socket.room === link && socket.id === client.id);

      if(!existingOnSocket){
        this.activeSockets.push({room:link, id: client.id, userId});

        const dto = {
          link,
          userId,
          x: 2,
          y: 2,
          orientation: 'down'
        } as UpdateUserPosition

        await this.service.updateUserPosition(client.id, dto);
        const users = await this.service.listUsersPositionByLink(link);

        this.wss.emit(`${link}-update-user-list`, {users});
        client.broadcast.emit(`${link}-add=user`, {user:client.id});
      }

      this.logger.debug(`Socket client: ${client.id} start to join room ${link}`);
  }

  @SubscribeMessage('move')
  async handleMove (client: Socket, payload: UpdateUserPosition){
    const {link, userId, x, y, orientation} = payload;
    const dto = {
      link,
      userId,
      x,
      y,
      orientation
    } as UpdateUserPosition

    await this.service.updateUserPosition(client.id, dto);
    const users = await this.service.listUsersPositionByLink(link);
    this.wss.emit(`${link}-update-user-list`, {users});
  }
  
  @SubscribeMessage('todl-mute-user')
  async handleToglMute (_: Socket, payload: ToggleDto){
    const {link} = payload;
    await this.service.updateUserMute(payload);
    const users = await this.service.listUsersPositionByLink(link);
    this.wss.emit(`${link}-update-user-list`, {users});
  } 
}
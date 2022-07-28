import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@models/user.model';
import { GoogleUserInfo } from '../../models/google-user-info';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User) private userModel: typeof User
  ) {}

  public async login(googleUserInfo: GoogleUserInfo) {
    const user = await this.userModel.upsert({
      ...googleUserInfo
    });
    return user[0];
  }

  public async checkToken(accessToken: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { accessToken }})
    if (!user) throw new UnauthorizedException();
    return user;
  }

}

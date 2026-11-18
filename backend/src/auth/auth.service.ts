import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private users: Model<UserDocument>,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.users.findOne({ email });
    if (!user) throw new UnauthorizedException('Unknown email address');
    if (user.password !== password) throw new UnauthorizedException('Incorrect password');

    const accessToken = await this.jwt.signAsync({ sub: user.id, role: user.role });
    return { accessToken, user };
  }
}

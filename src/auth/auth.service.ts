import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { enumSocialPlatform } from 'src/config/enums';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { REFRESH_TOKEN_EXPIRESIN } from 'src/config/constant';
import { v4 as uuid } from "uuid";

const {AUTH_REFRESH_SECRET_KEY} = process.env;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {
  }

  checkAccount(@Req() email: any) : Promise<User> {
    const row = this.userRepository.findOne({
      where: {
        email
      }
    });
    return row;
  }

  async register(@Req() email: any, socialPlatform: string) : Promise<User> {
    const randomNickname = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
    const row = await this.userRepository.save({
      ci: uuid(),
      email,
      nickname: randomNickname,
      regSocialPlatform: enumSocialPlatform[socialPlatform]
    });
    return row;
  }

  async generateAccessToken(checkAccountRow: User): Promise<string> {
    const {ci} = checkAccountRow;
    return this.jwtService.sign({
      ci
    });
  }

  async generateRefreshToken(checkAccountRow: User): Promise<string> {
    const {ci} = checkAccountRow;
    return this.jwtService.sign({
      ci,
    }, { 
      secret: AUTH_REFRESH_SECRET_KEY,
      expiresIn: REFRESH_TOKEN_EXPIRESIN 
    });
  }
}
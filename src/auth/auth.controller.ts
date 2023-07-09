import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_SOCIAL_PLATFORM_GOOGLE, AUTH_SOCIAL_PLATFORM_KAKAO, AUTH_SOCIAL_PLATFORM_NAVER } from 'src/config/constant';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

const {AUTH_LOGIN_CLINET_CALLBACK_URL} = process.env;
@Controller('auth')
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @ApiOperation({ summary: 'google login page', description: 'Redirect google login page' })
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/redirect')
  @ApiOperation({ summary: 'google login processing - Only Backend', description: 'google login processing' })
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { user } = req;
    let checkAccountRow = await this.authService.checkAccount(user);
    
    if(!checkAccountRow) {
      checkAccountRow = await this.authService.register(user, AUTH_SOCIAL_PLATFORM_GOOGLE);
    }
    const access_token = await this.authService.generateAccessToken(checkAccountRow);
    const refresh_token = await this.authService.generateRefreshToken(checkAccountRow);

    res.cookie('access-token', access_token);
    res.cookie('refresh-token', refresh_token);
    return res.redirect(`${AUTH_LOGIN_CLINET_CALLBACK_URL}`);
  }

  @Get('naver')
  @ApiOperation({ summary: 'naver login page', description: 'Redirect naver login page' })
  @UseGuards(AuthGuard('naver'))
  naverAuth() {}

  @Get('naver/redirect')
  @ApiOperation({ summary: 'naver login processing - Only Backend', description: 'naver login processing' })
  @UseGuards(AuthGuard('naver'))
  async naverLoginRedirect(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { user } = req;
    let checkAccountRow = await this.authService.checkAccount(user);
    
    if(!checkAccountRow) {
      checkAccountRow = await this.authService.register(user, AUTH_SOCIAL_PLATFORM_NAVER);
    }
    const access_token = await this.authService.generateAccessToken(checkAccountRow);
    const refresh_token = await this.authService.generateRefreshToken(checkAccountRow);

    res.cookie('access-token', access_token);
    res.cookie('refresh-token', refresh_token);
    return res.redirect(`${AUTH_LOGIN_CLINET_CALLBACK_URL}`);
  }

  @Get('kakao')
  @ApiOperation({ summary: 'kakao login page', description: 'Redirect kakao login page' })
  @UseGuards(AuthGuard('kakao'))
  kakaoAuth() {}

  @Get('kakao/redirect')
  @ApiOperation({ summary: 'kakao login processing - Only Backend', description: 'kakao login processing' })
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginRedirect(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { user } = req;
    let checkAccountRow = await this.authService.checkAccount(user);
    
    if(!checkAccountRow) {
      checkAccountRow = await this.authService.register(user, AUTH_SOCIAL_PLATFORM_KAKAO);
    }
    const access_token = await this.authService.generateAccessToken(checkAccountRow);
    const refresh_token = await this.authService.generateRefreshToken(checkAccountRow);

    res.cookie('access-token', access_token);
    res.cookie('refresh-token', refresh_token);
    return res.redirect(`${AUTH_LOGIN_CLINET_CALLBACK_URL}`);
  }
 
}
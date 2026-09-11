import { Global, Module } from '@nestjs/common';
import { RecaptchaService } from './recaptcha.service.js';

@Global()
@Module({
  providers: [RecaptchaService],
  exports: [RecaptchaService],
})
export class RecaptchaModule {}

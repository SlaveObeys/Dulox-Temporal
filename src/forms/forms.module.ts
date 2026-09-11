import { Module } from '@nestjs/common';
import { FormsService } from './forms.service.js';
import { FormsController } from './forms.controller.js';
import { MailModule } from '../mail/mail.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { RecaptchaModule } from '../recaptcha/recaptcha.module.js';

@Module({
  imports: [PrismaModule, MailModule, RecaptchaModule],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}

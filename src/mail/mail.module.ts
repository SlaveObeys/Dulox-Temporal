import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service.js';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST || 'smtp.resend.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER || 'resend',
          pass: process.env.SMTP_PASS || '', // REEMPLAZAR CON API KEY DE RESEND
        },
      },
      defaults: {
        from: '"Dulox Cotizaciones" <contacto@dulox.cl>', // Debe estar verificado en Resend
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

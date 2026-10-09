import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service.js';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = config.get<string>('SMTP_HOST', 'localhost');
        const port = Number(config.get<number>('SMTP_PORT', 1025));
        const secure =
          config.get<string>('SMTP_SECURE') === 'true' || port === 465;
        const user = config.get<string>('SMTP_USER', '');
        const pass = config.get<string>('SMTP_PASS', '');

        const auth = user ? { user, pass } : undefined;

        return {
          transport: {
            host,
            port,
            secure,
            ...(auth && { auth }),
            // Sin auth (Mailpit local) no hay TLS; con auth en 587 se exige STARTTLS
            ignoreTLS: !secure && !auth,
            requireTLS: !secure && !!auth,
          },
          defaults: {
            from:
              config.get<string>('MAIL_FROM') ||
              '"Dulox Cotizaciones" <contacto@dulox.cl>',
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

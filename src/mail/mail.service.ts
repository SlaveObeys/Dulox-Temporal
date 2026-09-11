import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    to: string,
    subject: string,
    html: string,
    replyTo?: string,
    attachments?: EmailAttachment[],
  ) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html,
        replyTo,
        attachments,
      });
      this.logger.log(`Correo enviado exitosamente a ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Error enviando correo a ${to}`, error);
      throw new InternalServerErrorException(
        'Error al enviar el correo. Inténtalo más tarde.',
      );
    }
  }
}

import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecaptchaService {
  private readonly logger = new Logger(RecaptchaService.name);
  private readonly secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.getOrThrow<string>(
      'RECAPTCHA_SECRET_KEY',
    );
  }

  async verify(token: string): Promise<boolean> {
    if (!token) {
      throw new BadRequestException('Falta la verificación de seguridad.');
    }

    // Permitir token de prueba para testing local y desarrollo
    if (
      process.env.NODE_ENV !== 'production' &&
      token === 'dev-token-dulox-test'
    ) {
      return true;
    }

    try {
      const response = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            secret: this.secretKey,
            response: token,
          }),
        },
      );

      const data = await response.json();

      if (!data.success) {
        this.logger.warn(
          `reCAPTCHA rechazado: ${JSON.stringify(data['error-codes'] ?? [])} hostname=${data.hostname ?? '-'}`,
        );
        throw new BadRequestException(
          'Verificación de seguridad fallida (reCAPTCHA).',
        );
      }

      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al verificar reCAPTCHA.');
    }
  }
}

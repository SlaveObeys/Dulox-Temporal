import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
import { RecaptchaService } from '../recaptcha/recaptcha.service.js';
import { ContactoDto } from './dto/contacto.dto.js';

@Injectable()
export class FormsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly recaptchaService: RecaptchaService,
  ) {}

  async handleContacto(dto: ContactoDto) {
    // 1. Verificar ReCaptcha
    await this.recaptchaService.verify(dto['g-recaptcha-response']);

    // 2. Guardar en Base de Datos
    const requestLog = await this.prisma.requestLog.create({
      data: {
        type: 'contacto',
        nombre: dto.nombre,
        rut: dto.rut,
        email: dto.email,
        telefono: dto.telefono,
        mensaje: dto.mensaje,
        clienteId: dto.clienteId || 'No disponible',
      },
    });

    // 3. Generar HTML del correo (Basado en el diseño original PHP)
    const html = `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.5; background-color: #f9f9f9; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .logo { display: block; margin: 0 auto 20px; width: 150px; }
        h2 { text-align: center; color: #e30613; font-size: 22px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { padding: 10px; border: 1px solid #ccc; text-align: left; }
        th { background-color: #f5f5f5; font-weight: bold; }
        .mensaje { background-color: #fdfdfd; padding: 15px; border-radius: 4px; border: 1px solid #ccc; white-space: pre-wrap; }
      </style>
    </head>
    <body>
      <div class='container'>
        <img src='https://cdn.shopify.com/s/files/1/0684/2377/8471/files/logo-2024120916220899407_x320.png' alt='Dulox Logo' class='logo'>
        
        <h2>📨 Nuevo mensaje de contacto</h2>
        
        <table>
          <tr><th colspan='2'>Datos del cliente</th></tr>
          <tr><td>Nombre</td><td>${dto.nombre}</td></tr>
          <tr><td>RUT</td><td>${dto.rut}</td></tr>
          <tr><td>Email</td><td>${dto.email}</td></tr>
          <tr><td>Teléfono</td><td>${dto.telefono}</td></tr>
          <tr><td>ID Cliente</td><td>${dto.clienteId || 'No disponible'}</td></tr>
        </table>
        
        <table>
          <tr><th>Mensaje</th></tr>
          <tr><td class='mensaje'>${dto.mensaje}</td></tr>
        </table>
      </div>
    </body>
    </html>
    `;

    // 4. Enviar Correo
    await this.mailService.sendEmail(
      'ignaciobilbao18@hotmail.com',
      '📨 Nuevo mensaje de contacto desde la web de Dulox',
      html,
      dto.email,
    );

    return {
      success: true,
      message: 'Solicitud enviada correctamente.',
      id: requestLog.id,
    };
  }

  // Agrega aquí los demás métodos (cotizacion_corte_laser, showroom, etc) siguiendo este mismo patrón.
}

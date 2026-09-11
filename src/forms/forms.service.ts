import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
import { RecaptchaService } from '../recaptcha/recaptcha.service.js';
import { ContactoDto } from './dto/contacto.dto.js';
import { CotizacionDto, ProductoCotizacionDto } from './dto/cotizacion.dto.js';
import { ShowroomDto } from './dto/showroom.dto.js';
import { CorteLaserDto } from './dto/corte-laser.dto.js';
import { CotizacionProyectoDto } from './dto/cotizacion-proyecto.dto.js';
import { TrabajaConNosotrosDto } from './dto/trabaja-con-nosotros.dto.js';
import { renderContactoEmail } from './templates/contacto.template.js';
import {
  renderCotizacionEmail,
  NormalizedProduct,
} from './templates/cotizacion.template.js';
import { renderShowroomEmail } from './templates/showroom.template.js';
import { renderCorteLaserEmail } from './templates/corte-laser.template.js';
import { renderCotizacionProyectoEmail } from './templates/cotizacion-proyecto.template.js';
import { renderTrabajaConNosotrosEmail } from './templates/trabaja-con-nosotros.template.js';

@Injectable()
export class FormsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly recaptchaService: RecaptchaService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Procesa formularios de contacto general.
   */
  async handleContacto(dto: ContactoDto) {
    // 1. Verificar reCAPTCHA
    await this.recaptchaService.verify(dto['g-recaptcha-response']);

    // 2. Guardar en Base de Datos PostgreSQL
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

    // 3. Generar HTML mediante plantilla modularizada
    const html = renderContactoEmail(dto);

    // 4. Enviar Correo
    const recipient =
      this.configService.get<string>('MAIL_TO') || 'contacto@dulox.cl';

    await this.mailService.sendEmail(
      recipient,
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

  /**
   * Procesa solicitudes de cotización con múltiples productos.
   */
  async handleCotizacion(dto: CotizacionDto) {
    // 1. Verificar reCAPTCHA
    await this.recaptchaService.verify(dto['g-recaptcha-response']);

    // 2. Normalizar y validar productos
    const productos = this.normalizeProductos(
      dto.productos,
      dto.productosDetalle,
    );

    if (productos.length === 0) {
      throw new BadRequestException('No se recibieron productos para cotizar.');
    }

    // 3. Guardar en Base de Datos PostgreSQL (RequestLog con metadata JSONB)
    const requestLog = await this.prisma.requestLog.create({
      data: {
        type: 'cotizacion',
        nombre: dto.nombre,
        rut: dto.rut,
        email: dto.email,
        telefono: dto.telefono,
        mensaje: dto.mensaje || null,
        clienteId: dto.clienteId || 'No disponible',
        metadata: {
          empresa: dto.empresa || null,
          direccion: dto.direccion,
          productos: productos.map((p) => ({
            id: p.id,
            titulo: p.titulo,
            cantidad: p.cantidad,
            url: p.url ?? null,
          })),
          productosDetalle: dto.productosDetalle || null,
        },
      },
    });

    // 4. Generar HTML institucional mediante plantilla modularizada
    const html = renderCotizacionEmail(dto, productos);

    // 5. Enviar Correo
    const recipient =
      this.configService.get<string>('MAIL_TO') || 'contacto@dulox.cl';

    await this.mailService.sendEmail(
      recipient,
      `Nueva solicitud de cotización en Dulox (${productos.length} producto${productos.length > 1 ? 's' : ''})`,
      html,
      dto.email,
    );

    return {
      success: true,
      message: 'Cotización enviada correctamente.',
      id: requestLog.id,
      totalProductos: productos.length,
    };
  }

  /**
   * Procesa solicitudes de agendamiento de visita al Showroom.
   */
  async handleShowroom(dto: ShowroomDto) {
    // 1. Verificar reCAPTCHA
    await this.recaptchaService.verify(dto['g-recaptcha-response']);

    // 2. Guardar en Base de Datos PostgreSQL
    const requestLog = await this.prisma.requestLog.create({
      data: {
        type: 'showroom',
        nombre: dto.nombre,
        rut: dto.rut || 'No aplica',
        email: dto.email,
        telefono: dto.telefono,
        mensaje: dto.mensaje || null,
        clienteId: dto.clienteId || 'No disponible',
        metadata: {
          contacto_por: dto.contacto_por,
          fecha_hora: dto.fecha_hora,
        },
      },
    });

    // 3. Generar HTML institucional mediante plantilla modularizada
    const html = renderShowroomEmail(dto);

    // 4. Enviar Correo
    const recipient =
      this.configService.get<string>('MAIL_TO') || 'contacto@dulox.cl';

    await this.mailService.sendEmail(
      recipient,
      '📅 Nueva solicitud de visita Showroom - Dulox',
      html,
      dto.email,
    );

    return {
      success: true,
      message: 'Visita al showroom agendada correctamente.',
      id: requestLog.id,
    };
  }

  /**
   * Procesa solicitudes de cotización de corte láser.
   */
  async handleCorteLaser(dto: CorteLaserDto) {
    // 1. Verificar reCAPTCHA
    await this.recaptchaService.verify(dto['g-recaptcha-response']);

    // 2. Guardar en Base de Datos PostgreSQL
    const requestLog = await this.prisma.requestLog.create({
      data: {
        type: 'corte_laser',
        nombre: dto.nombre,
        rut: dto.rut || 'No aplica',
        email: dto.email,
        telefono: dto.telefono,
        mensaje: dto.mensaje,
        clienteId: dto.clienteId || 'No disponible',
      },
    });

    // 3. Generar HTML mediante plantilla modularizada
    const html = renderCorteLaserEmail(dto);

    // 4. Enviar Correo
    const recipient =
      this.configService.get<string>('MAIL_TO') || 'contacto@dulox.cl';

    await this.mailService.sendEmail(
      recipient,
      '✂️ Nueva solicitud de cotización de corte láser - Dulox',
      html,
      dto.email,
    );

    return {
      success: true,
      message: 'Solicitud de cotización de corte láser enviada correctamente.',
      id: requestLog.id,
    };
  }

  /**
   * Procesa solicitudes de cotización de proyectos (personalizados o generales).
   */
  async handleCotizacionProyecto(dto: CotizacionProyectoDto) {
    // 1. Verificar reCAPTCHA
    await this.recaptchaService.verify(dto['g-recaptcha-response']);

    // 2. Guardar en Base de Datos PostgreSQL
    const requestLog = await this.prisma.requestLog.create({
      data: {
        type: 'cotizacion_proyecto',
        nombre: dto.nombre,
        rut: dto.rut || 'No aplica',
        email: dto.email,
        telefono: dto.telefono,
        mensaje: dto.mensaje || null,
        clienteId: dto.clienteId || 'No disponible',
        metadata: {
          empresa: dto.empresa,
          direccion: dto.direccion,
          projectTitle: dto.projectTitle || 'Sin nombre',
          projectUrl: dto.projectUrl || 'No disponible',
        },
      },
    });

    // 3. Generar HTML institucional mediante plantilla modularizada
    const html = renderCotizacionProyectoEmail(dto);

    // 4. Enviar Correo
    const recipient =
      this.configService.get<string>('MAIL_TO') || 'contacto@dulox.cl';

    await this.mailService.sendEmail(
      recipient,
      'Nueva solicitud de cotización de proyecto en Dulox',
      html,
      dto.email,
    );

    return {
      success: true,
      message: 'Solicitud de cotización enviada correctamente.',
      id: requestLog.id,
    };
  }

  /**
   * Procesa postulaciones laborales de Trabaja con Nosotros con archivo CV adjunto.
   */
  async handleTrabajaConNosotros(
    dto: TrabajaConNosotrosDto,
    file?: Express.Multer.File,
  ) {
    // 1. Validar archivo CV
    if (!file) {
      throw new BadRequestException(
        'Debes adjuntar tu currículum vitae (CV) en formato PDF o Word.',
      );
    }

    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSizeBytes) {
      throw new BadRequestException('El archivo no debe pesar más de 5MB.');
    }

    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/octet-stream',
    ];
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const ext = file.originalname
      .substring(file.originalname.lastIndexOf('.'))
      .toLowerCase();

    if (
      !allowedMimeTypes.includes(file.mimetype) &&
      !allowedExtensions.includes(ext)
    ) {
      throw new BadRequestException(
        'El archivo debe ser en formato PDF o Word (.pdf, .doc, .docx).',
      );
    }

    // 2. Verificar reCAPTCHA
    await this.recaptchaService.verify(dto['g-recaptcha-response']);

    // 3. Guardar en Base de Datos PostgreSQL
    const requestLog = await this.prisma.requestLog.create({
      data: {
        type: 'trabaja_con_nosotros',
        nombre: dto.nombre,
        rut: dto.rut || 'No aplica',
        email: dto.email,
        telefono: dto.telefono || 'No informado',
        mensaje: dto.mensaje,
        clienteId: dto.clienteId || 'No disponible',
        metadata: {
          archivoNombre: file.originalname,
          archivoTamano: file.size,
          archivoMimetype: file.mimetype,
        },
      },
    });

    // 4. Generar HTML institucional mediante plantilla modularizada
    const html = renderTrabajaConNosotrosEmail(dto, file);

    // 5. Enviar Correo con archivo adjunto directamente (sin almacenar en disco)
    const recipient =
      this.configService.get<string>('MAIL_TRABAJA_TO') ||
      this.configService.get<string>('MAIL_TO') ||
      'gestiondepersonas@dulox.cl';

    await this.mailService.sendEmail(
      recipient,
      '📩 Nueva postulación desde el formulario web - Dulox',
      html,
      dto.email,
      [
        {
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype,
        },
      ],
    );

    return {
      success: true,
      message: 'Postulación enviada correctamente.',
      id: requestLog.id,
    };
  }

  /**
   * Normaliza los productos recibidos tanto en formato string ("id|titulo|cantidad|url")
   * como en objetos JSON o texto plano fallback.
   */
  private normalizeProductos(
    productosRaw?: (string | ProductoCotizacionDto)[],
    detallePlano?: string,
  ): NormalizedProduct[] {
    const productos: NormalizedProduct[] = [];

    if (Array.isArray(productosRaw) && productosRaw.length > 0) {
      for (const item of productosRaw) {
        if (typeof item === 'string') {
          const partes = item.split('|');
          if (partes.length >= 3) {
            let urlProducto = partes[3] ? partes[3].trim() : '';
            if (urlProducto && urlProducto.startsWith('/products/')) {
              urlProducto = `https://dulox.cl${urlProducto}`;
            }

            productos.push({
              id: partes[0].trim(),
              titulo: partes[1].trim(),
              cantidad: Math.max(1, parseInt(partes[2], 10) || 1),
              url: urlProducto || undefined,
            });
          }
        } else if (typeof item === 'object' && item !== null) {
          let urlProducto = item.url ? String(item.url).trim() : '';
          if (urlProducto && urlProducto.startsWith('/products/')) {
            urlProducto = `https://dulox.cl${urlProducto}`;
          }

          productos.push({
            id: String(item.id).trim(),
            titulo: String(item.titulo).trim(),
            cantidad: Math.max(1, Number(item.cantidad) || 1),
            url: urlProducto || undefined,
          });
        }
      }
    }

    // Fallback si no vinieron productos en array pero sí detalle plano
    if (productos.length === 0 && detallePlano?.trim()) {
      const lineas = detallePlano.split('\n');
      let contador = 1;
      for (const linea of lineas) {
        const texto = linea.trim();
        if (texto) {
          productos.push({
            id: `ITEM-${contador}`,
            titulo: texto,
            cantidad: 1,
          });
          contador++;
        }
      }
    }

    return productos;
  }
}

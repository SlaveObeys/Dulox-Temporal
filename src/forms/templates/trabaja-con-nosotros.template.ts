import { TrabajaConNosotrosDto } from '../dto/trabaja-con-nosotros.dto.js';
import { renderBaseEmailLayout } from './base.layout.js';

export function renderTrabajaConNosotrosEmail(
  dto: TrabajaConNosotrosDto,
  file: Express.Multer.File,
): string {
  const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
  const clienteId = dto.clienteId || 'No disponible';

  const content = `
    <!-- 👤 Datos del Postulante -->
    <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
      👤 Datos del postulante
    </h2>
    <table width='100%' cellpadding='0' cellspacing='0'
           style='border-collapse:collapse;font-size:13px;margin-bottom:24px;'>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;width:35%;font-weight:600;color:#374151;'>Nombre completo</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;font-weight:600;'>${dto.nombre}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>Correo electrónico</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;'>
          <a href='mailto:${dto.email}' style='color:#e50913;text-decoration:none;font-weight:600;'>${dto.email}</a>
        </td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>Teléfono</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.telefono || '<em style="color:#9ca3af;">No indicado</em>'}</td>
      </tr>
      ${
        dto.rut
          ? `<tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>RUT</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;font-family:monospace;'>${dto.rut}</td>
      </tr>`
          : ''
      }
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>ID Cliente Shopify</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#6b7280;font-size:12px;'>${clienteId}</td>
      </tr>
    </table>

    <!-- 📎 Información del Archivo Adjunto -->
    <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
      📎 Currículum Vitae adjunto
    </h2>
    <table width='100%' cellpadding='0' cellspacing='0'
           style='border-collapse:collapse;font-size:13px;margin-bottom:24px;'>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;width:35%;font-weight:600;color:#374151;'>Nombre del archivo</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;font-family:monospace;'>${file.originalname}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>Tamaño</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${fileSizeMB} MB</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>Tipo de documento</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#4b5563;font-size:12px;'>${file.mimetype}</td>
      </tr>
      <tr>
        <td colspan='2' style='padding:10px;border:1px solid #e5e7eb;background:#eff6ff;color:#1e40af;font-size:12px;'>
          📎 <strong>Archivo disponible:</strong> El archivo se encuentra adjunto a este correo para su descarga y revisión inmediata.
        </td>
      </tr>
    </table>

    <!-- 💬 Mensaje de Presentación -->
    <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
      💬 Mensaje de presentación / motivación
    </h2>
    <div style='background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;
                padding:14px 16px;font-size:13px;color:#374151;line-height:1.6;
                white-space:pre-wrap;margin-bottom:24px;'>
      ${dto.mensaje}
    </div>
  `;

  return renderBaseEmailLayout({
    title: 'Nueva Postulación Laboral',
    subtitle: 'Recepción de CV desde dulox.cl — Trabaja con nosotros',
    content,
  });
}

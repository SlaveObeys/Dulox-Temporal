import { ShowroomDto } from '../dto/showroom.dto.js';
import { renderBaseEmailLayout } from './base.layout.js';

export function renderShowroomEmail(dto: ShowroomDto): string {
  const normalized = dto.fecha_hora.replace('T', ' ').trim();
  const [fechaPart, horaPart] = normalized.split(' ');

  const metodosBadges = dto.contacto_por
    .map(
      (metodo) =>
        `<span style='display:inline-block;background:#fee2e2;color:#991b1b;border:1px solid #fecaca;font-weight:600;padding:4px 12px;border-radius:20px;font-size:12px;margin-right:6px;margin-bottom:4px;'>${metodo}</span>`,
    )
    .join('');

  const mensajeSeccion = dto.mensaje
    ? `
      <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
        💬 Comentarios o requerimientos adicionales
      </h2>
      <div style='background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;
                  padding:14px 16px;font-size:13px;color:#374151;line-height:1.6;
                  white-space:pre-wrap;margin-bottom:24px;'>
        ${dto.mensaje}
      </div>
    `
    : '';

  const content = `
    <!-- Tarjeta Destacada de Cita Programada -->
    <div style='background:#fef2f2;border:1.5px solid #fecaca;border-radius:8px;padding:18px 22px;margin-bottom:24px;'>
      <div style='font-size:11px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;'>
        🗓️ Cita de Visita Programada
      </div>
      <div style='font-size:18px;font-weight:700;color:#b91c1c;margin-bottom:6px;'>
        Fecha: ${fechaPart} &nbsp;|&nbsp; Hora: ${horaPart || ''} hrs
      </div>
      <div style='font-size:12px;color:#4b5563;'>
        Atención presencial en Showroom Dulox (Días hábiles de 09:00 a 13:00 hrs).
      </div>
    </div>

    <!-- 👤 Datos del Cliente -->
    <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
      👤 Datos del cliente
    </h2>
    <table width='100%' cellpadding='0' cellspacing='0'
           style='border-collapse:collapse;font-size:13px;margin-bottom:24px;'>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;width:35%;font-weight:600;color:#374151;'>Nombre</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.nombre}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>RUT</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;font-family:monospace;'>${dto.rut || '<em style="color:#9ca3af;">No indicado</em>'}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>Correo</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;'>
          <a href='mailto:${dto.email}' style='color:#e50913;text-decoration:none;font-weight:600;'>${dto.email}</a>
        </td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>Teléfono</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.telefono}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>ID Cliente Shopify</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#6b7280;font-size:12px;'>${dto.clienteId || 'No disponible'}</td>
      </tr>
    </table>

    <!-- 📞 Preferencias de Contacto -->
    <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
      📞 Método(s) preferido(s) de contacto
    </h2>
    <div style='margin-bottom:24px;padding:4px 0;'>
      ${metodosBadges}
    </div>

    ${mensajeSeccion}
  `;

  return renderBaseEmailLayout({
    title: 'Nueva Solicitud de Visita Showroom',
    subtitle: `Cita solicitada para el ${fechaPart} — dulox.cl`,
    content,
  });
}

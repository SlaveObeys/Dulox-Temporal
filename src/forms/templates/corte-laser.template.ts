import { CorteLaserDto } from '../dto/corte-laser.dto.js';
import { renderBaseEmailLayout } from './base.layout.js';

export function renderCorteLaserEmail(dto: CorteLaserDto): string {
  const content = `
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

    <!-- ⚙️ Detalles del Proyecto de Corte Láser -->
    <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
      ✂️ Detalles del proyecto de corte láser
    </h2>
    <div style='background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;
                padding:14px 16px;font-size:13px;color:#374151;line-height:1.6;
                white-space:pre-wrap;margin-bottom:24px;'>
      ${dto.mensaje}
    </div>
  `;

  return renderBaseEmailLayout({
    title: 'Nueva Solicitud de Corte Láser',
    subtitle: 'Cotización de proyecto personalizado — dulox.cl',
    content,
  });
}

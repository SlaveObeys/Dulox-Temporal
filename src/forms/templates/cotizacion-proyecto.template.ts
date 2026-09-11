import { CotizacionProyectoDto } from '../dto/cotizacion-proyecto.dto.js';
import { renderBaseEmailLayout } from './base.layout.js';

export function renderCotizacionProyectoEmail(
  dto: CotizacionProyectoDto,
): string {
  const proyecto = dto.projectTitle || 'Sin nombre';
  const proyectoUrl = dto.projectUrl || 'No disponible';
  const clienteId = dto.clienteId || 'No disponible';
  const mensaje = dto.mensaje || 'Sin mensaje adicional';

  const content = `
    <!-- 🏗️ Información del Proyecto -->
    <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
      🏗️ Información del proyecto
    </h2>
    <table width='100%' cellpadding='0' cellspacing='0'
           style='border-collapse:collapse;font-size:13px;margin-bottom:24px;'>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;width:35%;font-weight:600;color:#374151;'>Proyecto</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;font-weight:600;'>${proyecto}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>URL del proyecto</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;word-break:break-all;'>
          ${
            proyectoUrl !== 'No disponible'
              ? `<a href='${proyectoUrl}' target='_blank' style='color:#e50913;text-decoration:none;'>${proyectoUrl}</a>`
              : '<em style="color:#9ca3af;">No disponible</em>'
          }
        </td>
      </tr>
    </table>

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
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>Empresa</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.empresa}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>Email</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;'>
          <a href='mailto:${dto.email}' style='color:#e50913;text-decoration:none;font-weight:600;'>${dto.email}</a>
        </td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>Teléfono</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.telefono}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>Dirección</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.direccion}</td>
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

    <!-- 🏷️ Metadatos de la Solicitud -->
    <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
      🏷️ Metadatos de la solicitud
    </h2>
    <table width='100%' cellpadding='0' cellspacing='0'
           style='border-collapse:collapse;font-size:12px;margin-bottom:24px;font-family:monospace;'>
      <tr>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;background:#f9fafb;width:35%;color:#4b5563;'>meta_proyecto</td>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;color:#111827;'>${proyecto}</td>
      </tr>
      <tr>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;background:#f9fafb;color:#4b5563;'>meta_project_url</td>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;color:#111827;word-break:break-all;'>${proyectoUrl}</td>
      </tr>
      <tr>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;background:#f9fafb;color:#4b5563;'>meta_nombre</td>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.nombre}</td>
      </tr>
      <tr>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;background:#f9fafb;color:#4b5563;'>meta_empresa</td>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.empresa}</td>
      </tr>
      <tr>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;background:#f9fafb;color:#4b5563;'>meta_email</td>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.email}</td>
      </tr>
      <tr>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;background:#f9fafb;color:#4b5563;'>meta_telefono</td>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.telefono}</td>
      </tr>
      <tr>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;background:#f9fafb;color:#4b5563;'>meta_direccion</td>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.direccion}</td>
      </tr>
      <tr>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;background:#f9fafb;color:#4b5563;'>meta_clienteId</td>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;color:#111827;'>${clienteId}</td>
      </tr>
      <tr>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;background:#f9fafb;color:#4b5563;'>meta_mensaje</td>
        <td style='padding:6px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.mensaje || 'Sin mensaje'}</td>
      </tr>
    </table>

    <!-- 💬 Mensaje Adicional -->
    <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
      💬 Mensaje o requerimientos adicionales
    </h2>
    <div style='background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;
                padding:14px 16px;font-size:13px;color:#374151;line-height:1.6;
                white-space:pre-wrap;margin-bottom:24px;'>
      ${mensaje}
    </div>
  `;

  return renderBaseEmailLayout({
    title: 'Nueva Solicitud de Cotización de Proyecto',
    subtitle:
      proyecto !== 'Sin nombre'
        ? `Proyecto: ${proyecto}`
        : 'Cotización general de proyecto — dulox.cl',
    content,
  });
}

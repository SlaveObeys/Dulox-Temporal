import { CotizacionDto } from '../dto/cotizacion.dto.js';
import { renderBaseEmailLayout } from './base.layout.js';

export interface NormalizedProduct {
  id: string;
  titulo: string;
  cantidad: number;
  url?: string;
}

export function renderCotizacionEmail(
  dto: CotizacionDto,
  productos: NormalizedProduct[],
): string {
  const empresaHtml = dto.empresa
    ? dto.empresa
    : '<em style="color:#9ca3af;">No indicada</em>';

  const mensajeHtml = dto.mensaje
    ? dto.mensaje
    : '<em style="color:#9ca3af;">Sin mensaje adicional</em>';

  const filasProductos = productos
    .map((p, index) => {
      const tituloHtml = p.url
        ? `<a href='${p.url}' target='_blank' style='color:#e30613;text-decoration:none;font-weight:700;'>${p.titulo}</a>`
        : `<strong>${p.titulo}</strong>`;

      return `
        <tr>
          <td style='padding:9px 10px;border:1px solid #e5e7eb;text-align:center;color:#6b7280;'>${index + 1}</td>
          <td style='padding:9px 10px;border:1px solid #e5e7eb;'>${tituloHtml}</td>
          <td style='padding:9px 10px;border:1px solid #e5e7eb;color:#6b7280;font-size:12px;'>${p.id}</td>
          <td style='padding:9px 10px;border:1px solid #e5e7eb;text-align:center;font-weight:600;'>${p.cantidad}</td>
        </tr>
      `;
    })
    .join('');

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
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;font-family:monospace;'>${dto.rut}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>Empresa</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${empresaHtml}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>Correo</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;'>
          <a href='mailto:${dto.email}' style='color:#e50913;text-decoration:none;'>${dto.email}</a>
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
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>ID Cliente Shopify</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#6b7280;font-size:12px;'>${dto.clienteId || 'No disponible'}</td>
      </tr>
    </table>

    <!-- 🏷️ Metadatos de la Solicitud -->
    <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
      🏷️ Metadatos de la solicitud
    </h2>
    <table width='100%' cellpadding='0' cellspacing='0'
           style='border-collapse:collapse;font-size:13px;margin-bottom:24px;'>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;width:35%;font-weight:600;color:#374151;'>meta_nombre</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.nombre}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>meta_rut</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;font-family:monospace;'>${dto.rut}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>meta_empresa</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${empresaHtml}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>meta_correo</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;'>
          <a href='mailto:${dto.email}' style='color:#e50913;text-decoration:none;'>${dto.email}</a>
        </td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>meta_telefono</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.telefono}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>meta_direccion</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${dto.direccion}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>meta_clienteId</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#6b7280;font-size:12px;'>${dto.clienteId || 'No disponible'}</td>
      </tr>
      <tr>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;color:#374151;'>meta_mensaje</td>
        <td style='padding:8px 10px;border:1px solid #e5e7eb;color:#111827;'>${mensajeHtml}</td>
      </tr>
    </table>

    <!-- 📦 Productos Solicitados -->
    <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
      📦 Productos solicitados (${productos.length})
    </h2>
    <div style='border-radius:6px;overflow:hidden;border:1px solid #e5e7eb;margin-bottom:24px;font-size:13px;'>
      <table style='width:100%;border-collapse:collapse;font-family:Arial,sans-serif;margin-bottom:0;'>
        <thead>
          <tr style='background-color:#e50913;color:#ffffff;'>
            <th style='padding:9px 10px;border:1px solid #e30613;width:40px;'>#</th>
            <th style='padding:9px 10px;border:1px solid #e30613;text-align:left;'>Producto</th>
            <th style='padding:9px 10px;border:1px solid #e30613;text-align:left;'>ID Variante</th>
            <th style='padding:9px 10px;border:1px solid #e30613;width:80px;'>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          ${filasProductos}
        </tbody>
      </table>
    </div>

    <!-- 💬 Mensaje Adicional -->
    <h2 style='margin:0 0 14px;font-size:15px;color:#1e3a5f;border-bottom:2px solid #dbeafe;padding-bottom:6px;'>
      💬 Mensaje adicional
    </h2>
    <div style='background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;
                padding:12px 14px;font-size:13px;color:#374151;line-height:1.6;
                white-space:pre-wrap;margin-bottom:24px;'>
      ${mensajeHtml}
    </div>
  `;

  return renderBaseEmailLayout({
    title: 'Nueva Solicitud de Cotización',
    subtitle: `${productos.length} producto(s) — dulox.cl`,
    content,
  });
}

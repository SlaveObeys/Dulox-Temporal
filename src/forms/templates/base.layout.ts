export interface BaseEmailLayoutOptions {
  title: string;
  subtitle: string;
  content: string;
}

/**
 * Plantilla Base Institucional de Dulox para Correos HTML
 * Proporciona el contenedor, encabezado corporativo con logo y pie de página institucional.
 */
export function renderBaseEmailLayout(options: BaseEmailLayoutOptions): string {
  return `
  <!DOCTYPE html>
  <html lang='es'>
  <head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  </head>
  <body style='margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;'>
    <table width='100%' cellpadding='0' cellspacing='0' style='background:#f3f4f6;padding:30px 0;'>
      <tr>
        <td align='center'>
          <table width='620' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);'>

            <!-- Encabezado Rojo Corporativo Dulox -->
            <tr>
              <td style='background:#e50913;padding:28px 32px;text-align:center;'>
                <img src='https://cdn.shopify.com/s/files/1/0684/2377/8471/files/logo-2024120916220899407_x320.png'
                     alt='Dulox Logo' style='width:130px;display:block;margin:0 auto 12px;'>
                <h1 style='margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:.3px;'>
                  ${options.title}
                </h1>
                <p style='margin:6px 0 0;color:#fecaca;font-size:13px;'>
                  ${options.subtitle}
                </p>
              </td>
            </tr>

            <!-- Contenido Dinámico de la Solicitud -->
            <tr>
              <td style='padding:28px 32px;'>
                ${options.content}
              </td>
            </tr>

            <!-- Pie de Página Institucional -->
            <tr>
              <td style='background:#f1f5f9;padding:16px 32px;text-align:center;
                         font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0;'>
                Este correo fue generado automáticamente desde <strong>dulox.cl</strong>.<br>
                Para responder al cliente, utiliza el botón Responder de tu cliente de correo.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

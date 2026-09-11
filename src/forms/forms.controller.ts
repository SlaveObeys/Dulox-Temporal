import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FormsService } from './forms.service.js';
import { ContactoDto } from './dto/contacto.dto.js';
import { CotizacionDto } from './dto/cotizacion.dto.js';
import { ShowroomDto } from './dto/showroom.dto.js';
import { CorteLaserDto } from './dto/corte-laser.dto.js';
import { CotizacionProyectoDto } from './dto/cotizacion-proyecto.dto.js';
import { TrabajaConNosotrosDto } from './dto/trabaja-con-nosotros.dto.js';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('contacto')
  @HttpCode(200)
  async contacto(@Body() dto: ContactoDto) {
    return this.formsService.handleContacto(dto);
  }

  @Post('cotizacion')
  @HttpCode(200)
  async cotizacion(@Body() dto: CotizacionDto) {
    return this.formsService.handleCotizacion(dto);
  }

  @Post('showroom')
  @HttpCode(200)
  async showroom(@Body() dto: ShowroomDto) {
    return this.formsService.handleShowroom(dto);
  }

  @Post(['corte-laser', 'corte_laser'])
  @HttpCode(200)
  async corteLaser(@Body() dto: CorteLaserDto) {
    return this.formsService.handleCorteLaser(dto);
  }

  @Post([
    'cotizar-proyecto',
    'cotizacion-proyecto',
    'cotizar_proyecto',
    'cotizacion_proyecto',
  ])
  @HttpCode(200)
  async cotizarProyecto(@Body() dto: CotizacionProyectoDto) {
    return this.formsService.handleCotizacionProyecto(dto);
  }

  @Post(['trabaja-con-nosotros', 'trabaja_con_nosotros'])
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('cv'))
  async trabajaConNosotros(
    @Body() dto: TrabajaConNosotrosDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.formsService.handleTrabajaConNosotros(dto, file);
  }
}

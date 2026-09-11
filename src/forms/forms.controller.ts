import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { FormsService } from './forms.service.js';
import { ContactoDto } from './dto/contacto.dto.js';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('contacto')
  @HttpCode(200)
  async contacto(@Body() dto: ContactoDto) {
    return this.formsService.handleContacto(dto);
  }
}

import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsRut } from '../../common/validators/rut.validator.js';
import { IsShowroomDateTime } from '../../common/validators/showroom-date.validator.js';

export class ShowroomDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MinLength(4, { message: 'El nombre debe tener al menos 4 caracteres.' })
  @MaxLength(80, {
    message: 'El nombre debe tener como máximo 80 caracteres.',
  })
  nombre: string;

  @IsEmail({}, { message: 'Correo electrónico inválido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  email: string;

  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  @MinLength(8, { message: 'El teléfono debe tener al menos 8 caracteres.' })
  @MaxLength(12, {
    message: 'El teléfono debe tener como máximo 12 caracteres.',
  })
  telefono: string;

  @Transform(({ obj }) => obj.contacto_por ?? obj.contactoPor)
  @IsArray({ message: 'Los métodos de contacto deben ser un arreglo.' })
  @ArrayNotEmpty({ message: 'Seleccione al menos un método de contacto.' })
  @IsString({
    each: true,
    message: 'Cada método de contacto debe ser una cadena de texto.',
  })
  contacto_por: string[];

  @Transform(({ obj }) => obj.fecha_hora ?? obj.fechaHora)
  @IsString({ message: 'La fecha y hora deben ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Fecha y hora requeridas.' })
  @IsShowroomDateTime()
  fecha_hora: string;

  @IsString({ message: 'El RUT debe ser una cadena de texto.' })
  @IsOptional()
  @IsRut()
  rut?: string;

  @IsString({ message: 'El mensaje debe ser una cadena de texto.' })
  @IsOptional()
  @MaxLength(1000, {
    message: 'El mensaje no puede superar los 1000 caracteres.',
  })
  mensaje?: string;

  @IsString({ message: 'El ID del cliente debe ser una cadena de texto.' })
  @IsOptional()
  clienteId?: string;

  @IsString({ message: 'Falta la verificación de seguridad.' })
  @IsNotEmpty({ message: 'Falta la verificación de seguridad.' })
  'g-recaptcha-response': string;
}

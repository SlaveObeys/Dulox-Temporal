import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsRut } from '../../common/validators/rut.validator.js';

export class TrabajaConNosotrosDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MinLength(4, { message: 'El nombre debe tener al menos 4 caracteres.' })
  @MaxLength(80, {
    message: 'El nombre debe tener como máximo 80 caracteres.',
  })
  nombre: string;

  @Transform(({ obj, value }) => {
    const raw = value ?? obj?.correo;
    return typeof raw === 'string' ? raw.trim() : raw;
  })
  @IsEmail({}, { message: 'Correo electrónico inválido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @MaxLength(255, {
    message: 'El correo electrónico no puede exceder 255 caracteres.',
  })
  email: string;

  @Transform(({ value }) =>
    value && typeof value === 'string' && value.trim() !== ''
      ? value.trim()
      : undefined,
  )
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @IsOptional()
  @MinLength(8, { message: 'El teléfono debe tener al menos 8 caracteres.' })
  @MaxLength(12, {
    message: 'El teléfono debe tener como máximo 12 caracteres.',
  })
  telefono?: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El mensaje debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El mensaje de presentación es obligatorio.' })
  @MinLength(10, {
    message: 'El mensaje de presentación debe tener al menos 10 caracteres.',
  })
  @MaxLength(2000, {
    message: 'El mensaje no puede superar los 2000 caracteres.',
  })
  mensaje: string;

  @Transform(({ value }) =>
    value && typeof value === 'string' && value.trim() !== ''
      ? value.trim()
      : undefined,
  )
  @IsString({ message: 'El RUT debe ser una cadena de texto.' })
  @IsOptional()
  @IsRut()
  rut?: string;

  @Transform(({ value }) =>
    value && typeof value === 'string' && value.trim() !== ''
      ? value.trim()
      : undefined,
  )
  @IsString({ message: 'El ID del cliente debe ser una cadena de texto.' })
  @IsOptional()
  clienteId?: string;

  @IsString({ message: 'Falta la verificación de seguridad.' })
  @IsNotEmpty({ message: 'Falta la verificación de seguridad.' })
  'g-recaptcha-response': string;
}

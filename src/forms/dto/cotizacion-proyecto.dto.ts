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

export class CotizacionProyectoDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MinLength(4, { message: 'El nombre debe tener al menos 4 caracteres.' })
  @MaxLength(80, {
    message: 'El nombre debe tener como máximo 80 caracteres.',
  })
  nombre: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre de la empresa debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre de la empresa es obligatorio.' })
  @MinLength(2, {
    message: 'El nombre de la empresa debe tener al menos 2 caracteres.',
  })
  @MaxLength(100, {
    message: 'El nombre de la empresa debe tener como máximo 100 caracteres.',
  })
  empresa: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail({}, { message: 'Correo electrónico inválido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  @MaxLength(255, {
    message: 'El correo electrónico no puede exceder 255 caracteres.',
  })
  email: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  @MinLength(8, { message: 'El teléfono debe tener al menos 8 caracteres.' })
  @MaxLength(12, {
    message: 'El teléfono debe tener como máximo 12 caracteres.',
  })
  telefono: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  @MinLength(4, { message: 'La dirección debe tener al menos 4 caracteres.' })
  @MaxLength(200, {
    message: 'La dirección debe tener como máximo 200 caracteres.',
  })
  direccion: string;

  @Transform(({ value }) =>
    value && typeof value === 'string' && value.trim() !== ''
      ? value.trim()
      : undefined,
  )
  @IsString({ message: 'El mensaje debe ser una cadena de texto.' })
  @IsOptional()
  @MaxLength(1000, {
    message: 'El mensaje adicional no puede superar los 1000 caracteres.',
  })
  mensaje?: string;

  @Transform(({ obj }) => {
    const val = obj?.projectTitle ?? obj?.proyecto ?? obj?.project_title;
    return val && typeof val === 'string' && val.trim() !== ''
      ? val.trim()
      : undefined;
  })
  @IsString({ message: 'El título del proyecto debe ser una cadena de texto.' })
  @IsOptional()
  @MaxLength(255, {
    message: 'El título del proyecto no puede superar los 255 caracteres.',
  })
  projectTitle?: string;

  @Transform(({ obj }) => {
    const val = obj?.projectUrl ?? obj?.proyectoUrl ?? obj?.project_url;
    return val && typeof val === 'string' && val.trim() !== ''
      ? val.trim()
      : undefined;
  })
  @IsString({ message: 'La URL del proyecto debe ser una cadena de texto.' })
  @IsOptional()
  @MaxLength(500, {
    message: 'La URL del proyecto no puede superar los 500 caracteres.',
  })
  projectUrl?: string;

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

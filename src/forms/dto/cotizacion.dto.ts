import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsRut } from '../../common/validators/rut.validator.js';

export class ProductoCotizacionDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  cantidad: number;

  @IsString()
  @IsOptional()
  url?: string;
}

export class CotizacionDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MinLength(4, { message: 'El nombre debe tener al menos 4 caracteres.' })
  @MaxLength(80, {
    message: 'El nombre debe tener como máximo 80 caracteres.',
  })
  nombre: string;

  @IsString({ message: 'El RUT debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El RUT es obligatorio.' })
  @IsRut()
  rut: string;

  @IsString({ message: 'La empresa debe ser una cadena de texto.' })
  @IsOptional()
  @MinLength(2, { message: 'La empresa debe tener al menos 2 caracteres.' })
  @MaxLength(100, {
    message: 'La empresa debe tener como máximo 100 caracteres.',
  })
  empresa?: string;

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

  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  @MinLength(4, { message: 'La dirección debe tener al menos 4 caracteres.' })
  @MaxLength(200, {
    message: 'La dirección debe tener como máximo 200 caracteres.',
  })
  direccion: string;

  @IsString({ message: 'El mensaje debe ser una cadena de texto.' })
  @IsOptional()
  @MaxLength(1000, {
    message: 'El mensaje adicional no puede superar los 1000 caracteres.',
  })
  mensaje?: string;

  @IsString({ message: 'El ID del cliente debe ser una cadena de texto.' })
  @IsOptional()
  clienteId?: string;

  @IsArray({ message: 'Los productos deben ser un arreglo.' })
  @IsOptional()
  productos?: (string | ProductoCotizacionDto)[];

  @IsString({ message: 'El detalle de productos debe ser una cadena de texto.' })
  @IsOptional()
  productosDetalle?: string;

  @IsString({ message: 'Falta la verificación de seguridad.' })
  @IsNotEmpty({ message: 'Falta la verificación de seguridad.' })
  'g-recaptcha-response': string;
}

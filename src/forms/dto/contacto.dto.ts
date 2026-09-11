import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsRut } from '../../common/validators/rut.validator.js';

export class BaseContactDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MinLength(4, { message: 'El nombre debe tener al menos 4 caracteres.' })
  @MaxLength(80, { message: 'El nombre debe tener como máximo 80 caracteres.' })
  nombre: string;

  @IsString({ message: 'El RUT debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El RUT es obligatorio.' })
  @IsRut()
  rut: string;

  @IsEmail({}, { message: 'Correo electrónico inválido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  email: string;

  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  @MinLength(9, { message: 'El teléfono debe tener al menos 9 caracteres.' })
  @MaxLength(11, {
    message: 'El teléfono debe tener como máximo 11 caracteres.',
  })
  telefono: string;

  @IsString({ message: 'El ID del cliente debe ser una cadena de texto.' })
  @IsOptional()
  clienteId?: string;

  @IsString({ message: 'Falta la verificación de seguridad.' })
  @IsNotEmpty({ message: 'Falta la verificación de seguridad.' })
  'g-recaptcha-response': string;
}

export class ContactoDto extends BaseContactDto {
  @IsString({ message: 'El mensaje debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El mensaje es obligatorio.' })
  @MinLength(10, { message: 'El mensaje debe tener al menos 10 caracteres.' })
  mensaje: string;
}

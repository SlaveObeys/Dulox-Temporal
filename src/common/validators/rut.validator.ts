import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsRutConstraint implements ValidatorConstraintInterface {
  validate(rut: string) {
    if (typeof rut !== 'string') return false;

    // Limpieza robusta para manejar UTF-8 y otros caracteres
    const cleanRut = rut.replace(/[^kK0-9]/g, '');
    if (cleanRut.length < 2) return false;

    const cuerpo = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();

    // Verifica que el cuerpo del RUT contenga solo números
    if (!/^\d+$/.test(cuerpo)) {
      return false;
    }

    let suma = 0;
    let multiplo = 2;

    for (let i = 1; i <= cuerpo.length; i++) {
      suma += multiplo * parseInt(cuerpo[cuerpo.length - i], 10);
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    let dvEsperado = 11 - (suma % 11);
    let dvEsperadoStr = '';
    
    if (dvEsperado === 11) {
      dvEsperadoStr = '0';
    } else if (dvEsperado === 10) {
      dvEsperadoStr = 'K';
    } else {
      dvEsperadoStr = dvEsperado.toString();
    }

    return dv === dvEsperadoStr;
  }

  defaultMessage() {
    return 'El RUT ingresado no es válido.';
  }
}

export function IsRut(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRutConstraint,
    });
  };
}

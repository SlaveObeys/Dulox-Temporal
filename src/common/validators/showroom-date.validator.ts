import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsShowroomDateTimeConstraint
  implements ValidatorConstraintInterface
{
  private failureReason = '';

  validate(value: any) {
    if (typeof value !== 'string' || !value.trim()) {
      this.failureReason = 'La fecha y hora de la visita son requeridas.';
      return false;
    }

    // Normalizar formato: aceptar "YYYY-MM-DD HH:mm" o "YYYY-MM-DDTHH:mm"
    const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})$/);
    if (!match) {
      this.failureReason =
        'Formato de fecha y hora inválido. Debe ser YYYY-MM-DD HH:mm (ej: 2026-09-15 10:30).';
      return false;
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // 0-indexed
    const day = parseInt(match[3], 10);
    const hours = parseInt(match[4], 10);
    const minutes = parseInt(match[5], 10);

    const date = new Date(year, month, day, hours, minutes);

    if (
      isNaN(date.getTime()) ||
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      this.failureReason = 'La fecha ingresada no es válida en el calendario.';
      return false;
    }

    // 1. Días hábiles: Lunes (1) a Viernes (5). 0 = Domingo, 6 = Sábado
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      this.failureReason =
        'Solo se permiten visitas en días hábiles (Lunes a Viernes).';
      return false;
    }

    // 2. Horario hábil: de 09:00 a 13:00 hrs
    const totalMinutes = hours * 60 + minutes;
    const minTime = 9 * 60; // 09:00 -> 540 min
    const maxTime = 13 * 60; // 13:00 -> 780 min

    if (totalMinutes < minTime || totalMinutes > maxTime) {
      this.failureReason =
        'El horario de visita debe ser entre las 09:00 y las 13:00 hrs.';
      return false;
    }

    return true;
  }

  defaultMessage(_args: ValidationArguments) {
    return (
      this.failureReason ||
      'La fecha y hora programada no cumple con las condiciones del Showroom.'
    );
  }
}

export function IsShowroomDateTime(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsShowroomDateTimeConstraint,
    });
  };
}

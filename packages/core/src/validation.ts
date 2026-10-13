import type { CheckoutErrors, CheckoutForm } from './types';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CO_MOBILE = /^3\d{9}$/;

export function validateCheckout(form: CheckoutForm): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (form.name.trim().length < 3) errors.name = 'Escribe tu nombre completo.';
  if (!EMAIL.test(form.email.trim())) errors.email = 'Escribe un correo válido, por ejemplo ana@correo.com.';
  const phone = form.phone.replace(/[\s-]/g, '');
  if (!CO_MOBILE.test(phone)) errors.phone = 'Escribe un celular de 10 dígitos que empiece por 3.';
  if (form.city.trim().length < 2) errors.city = 'Indica tu ciudad.';
  if (form.address.trim().length < 6) errors.address = 'Escribe la dirección de entrega.';
  return errors;
}

export const isValid = (errors: CheckoutErrors) => Object.keys(errors).length === 0;

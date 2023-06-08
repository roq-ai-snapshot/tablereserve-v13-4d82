import * as yup from 'yup';
import { reservationValidationSchema } from 'validationSchema/reservations';
import { tableConfigurationValidationSchema } from 'validationSchema/table-configurations';
import { waiterValidationSchema } from 'validationSchema/waiters';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  organization_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
  reservation: yup.array().of(reservationValidationSchema),
  table_configuration: yup.array().of(tableConfigurationValidationSchema),
  waiter: yup.array().of(waiterValidationSchema),
});

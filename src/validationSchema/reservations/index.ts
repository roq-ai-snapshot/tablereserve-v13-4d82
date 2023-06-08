import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  table_id: yup.string().required(),
  date: yup.date().required(),
  time: yup.date().required(),
  preferences: yup.string(),
  customer_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});

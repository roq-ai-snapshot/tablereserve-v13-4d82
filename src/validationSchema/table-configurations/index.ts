import * as yup from 'yup';

export const tableConfigurationValidationSchema = yup.object().shape({
  table_id: yup.string().required(),
  configuration: yup.string().required(),
  restaurant_id: yup.string().nullable().required(),
});

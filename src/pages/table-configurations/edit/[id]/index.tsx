import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getTableConfigurationById, updateTableConfigurationById } from 'apiSdk/table-configurations';
import { Error } from 'components/error';
import { tableConfigurationValidationSchema } from 'validationSchema/table-configurations';
import { TableConfigurationInterface } from 'interfaces/table-configuration';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getRestaurants } from 'apiSdk/restaurants';

function TableConfigurationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TableConfigurationInterface>(
    () => (id ? `/table-configurations/${id}` : null),
    () => getTableConfigurationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TableConfigurationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTableConfigurationById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TableConfigurationInterface>({
    initialValues: data,
    validationSchema: tableConfigurationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Table Configuration
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="table_id" mb="4" isInvalid={!!formik.errors?.table_id}>
              <FormLabel>Table Id</FormLabel>
              <Input type="text" name="table_id" value={formik.values?.table_id} onChange={formik.handleChange} />
              {formik.errors.table_id && <FormErrorMessage>{formik.errors?.table_id}</FormErrorMessage>}
            </FormControl>
            <FormControl id="configuration" mb="4" isInvalid={!!formik.errors?.configuration}>
              <FormLabel>Configuration</FormLabel>
              <Input
                type="text"
                name="configuration"
                value={formik.values?.configuration}
                onChange={formik.handleChange}
              />
              {formik.errors.configuration && <FormErrorMessage>{formik.errors?.configuration}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<RestaurantInterface>
              formik={formik}
              name={'restaurant_id'}
              label={'Select Restaurant'}
              placeholder={'Select Restaurant'}
              fetcher={getRestaurants}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'table_configuration',
  operation: AccessOperationEnum.UPDATE,
})(TableConfigurationEditPage);

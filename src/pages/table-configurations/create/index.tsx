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
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createTableConfiguration } from 'apiSdk/table-configurations';
import { Error } from 'components/error';
import { tableConfigurationValidationSchema } from 'validationSchema/table-configurations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getRestaurants } from 'apiSdk/restaurants';
import { TableConfigurationInterface } from 'interfaces/table-configuration';

function TableConfigurationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TableConfigurationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTableConfiguration(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TableConfigurationInterface>({
    initialValues: {
      table_id: '',
      configuration: '',
      restaurant_id: (router.query.restaurant_id as string) ?? null,
    },
    validationSchema: tableConfigurationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Table Configuration
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'table_configuration',
  operation: AccessOperationEnum.CREATE,
})(TableConfigurationCreatePage);

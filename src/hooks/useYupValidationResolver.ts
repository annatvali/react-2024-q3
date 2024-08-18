import { useCallback } from 'react';
import * as yup from 'yup';
import FormValues from '../types/FormData';

const useYupValidationResolver = (
  validationSchema: yup.ObjectSchema<FormValues>
) =>
  useCallback(
    async (data: FormValues) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (error) {
        const yupError = error as yup.ValidationError;
        return {
          values: {},
          errors:
            yupError.inner?.reduce<
              Record<string, { type: string; message: string }>
            >((allErrors, currentError) => {
              if (typeof currentError.path === 'string') {
                return {
                  ...allErrors,
                  [currentError.path]: {
                    type: currentError.type ?? 'validation',
                    message: currentError.message,
                  },
                };
              }
              return allErrors;
            }, {}) || {},
        };
      }
    },
    [validationSchema]
  );

export default useYupValidationResolver;

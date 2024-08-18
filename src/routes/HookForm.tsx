import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFormData } from '../features/formSlice';
import FormComponent from '../components/FormComponent';
import useYupValidationResolver from '../hooks/useYupValidationResolver';
import validationSchema from '../validation/validationSchema';
import { FormData } from '../types/FormData';

const HookForm = () => {
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver, mode: 'onChange' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const formData: FormData = {
      ...data,
      picture: data.picture ? Array.from(data.picture) : [],
    };
    dispatch(addFormData(formData));
    navigate('/');
  };

  return (
    <FormComponent
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
    />
  );
};

export default HookForm;

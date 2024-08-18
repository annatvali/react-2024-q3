import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addFormData } from '../features/formSlice';
import { FormData } from '../types/FormData';
import validationSchema from '../validation/validationSchema';

const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      terms: termsRef.current?.checked || false,
      picture: pictureRef.current?.files
        ? Array.from(pictureRef.current.files)
        : [],
      country: countryRef.current?.value || '',
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      dispatch(addFormData(formData));
      navigate('/');
    } catch (validationErrors) {
      const formattedErrors: Record<string, string> = {};
      if (validationErrors instanceof Yup.ValidationError) {
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            formattedErrors[error.path] = error.message;
          }
        });
      }
      setErrors(formattedErrors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg"
    >
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <label
          htmlFor="name"
          className="mb-1 md:mb-0 font-bold w-32 text-gray-700"
        >
          Name
        </label>
        <div className="flex-1">
          <input
            id="name"
            ref={nameRef}
            className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <label
          htmlFor="age"
          className="mb-1 md:mb-0 font-bold w-32 text-gray-700"
        >
          Age
        </label>
        <div className="flex-1">
          <input
            id="age"
            type="number"
            ref={ageRef}
            className={`border ${errors.age ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <label
          htmlFor="email"
          className="mb-1 md:mb-0 font-bold w-32 text-gray-700"
        >
          Email
        </label>
        <div className="flex-1">
          <input
            id="email"
            type="email"
            ref={emailRef}
            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <label
          htmlFor="password"
          className="mb-1 md:mb-0 font-bold w-32 text-gray-700"
        >
          Password
        </label>
        <div className="flex-1">
          <input
            id="password"
            type="password"
            ref={passwordRef}
            className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <label
          htmlFor="confirmPassword"
          className="mb-1 md:mb-0 font-bold w-32 text-gray-700"
        >
          Confirm Password
        </label>
        <div className="flex-1">
          <input
            id="confirmPassword"
            type="password"
            ref={confirmPasswordRef}
            className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <label
          htmlFor="gender"
          className="mb-1 md:mb-0 font-bold w-32 text-gray-700"
        >
          Gender
        </label>
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="male"
                ref={genderRef}
                name="gender"
                className={`mr-2 ${errors.gender ? 'border-red-500' : ''}`}
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="female"
                ref={genderRef}
                name="gender"
                className={`mr-2 ${errors.gender ? 'border-red-500' : ''}`}
              />
              Female
            </label>
          </div>
          <div className="h-6">
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <label
          htmlFor="terms"
          className="mb-1 md:mb-0 font-bold w-32 text-gray-700"
        >
          Accept Terms
        </label>
        <div className="flex-1">
          <input
            id="terms"
            type="checkbox"
            ref={termsRef}
            className={`border ${errors.terms ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <label
          htmlFor="picture"
          className="mb-1 md:mb-0 font-bold w-32 text-gray-700"
        >
          Picture
        </label>
        <div className="flex-1">
          <input
            id="picture"
            type="file"
            ref={pictureRef}
            className={`border ${errors.picture ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.picture && (
              <p className="text-red-500 text-sm">{errors.picture}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <label
          htmlFor="country"
          className="mb-1 md:mb-0 font-bold w-32 text-gray-700"
        >
          Country
        </label>
        <div className="flex-1">
          <select
            id="country"
            ref={countryRef}
            className={`border ${errors.country ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select a country</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
          </select>
          <div className="h-6">
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UncontrolledForm;

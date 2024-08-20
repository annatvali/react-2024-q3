import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormData } from '../types/FormData';

interface FormComponentProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const FormComponent: React.FC<FormComponentProps> = ({
  handleSubmit,
  register,
  errors,
}) => {
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
            {...register('name')}
            className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
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
            {...register('age')}
            className={`border ${errors.age ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
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
            {...register('email')}
            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
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
            {...register('password')}
            className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
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
            {...register('confirmPassword')}
            className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
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
                {...register('gender')}
                className={`mr-2 ${errors.gender ? 'border-red-500' : ''}`}
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="female"
                {...register('gender')}
                className={`mr-2 ${errors.gender ? 'border-red-500' : ''}`}
              />
              Female
            </label>
          </div>
          <div className="h-6">
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
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
            {...register('terms')}
            className={`border ${errors.terms ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
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
            accept="image/jpeg,image/png"
            {...register('picture')}
            className={`border ${errors.picture ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="h-6">
            {errors.picture && (
              <p className="text-red-500 text-sm">{errors.picture.message}</p>
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
            {...register('country')}
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
              <p className="text-red-500 text-sm">{errors.country.message}</p>
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

export default FormComponent;

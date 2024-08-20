export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: FileMetadata[];
  country: string;
}

export interface FileMetadata {
  base64?: string;
  name: string;
  size: number;
  type: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export default FormData;

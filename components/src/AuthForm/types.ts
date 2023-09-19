import {
  AlertProps,
  TextFieldProps,
} from '@mui/material';
import {
  AuthResponse,
  AuthTokenResponse,
  Session,
  User,
} from '@supabase/supabase-js';
import { FormEvent } from 'react';

export interface AuthAlert {
  severity: AlertProps['severity'];
  text: string;
}

export type AuthField<Field> = Partial<Omit<TextFieldProps, 'name'>> & Field & {
  name: Required<TextFieldProps>['name'];  // Make sure name is a key of T
  value?: string; // TODO: update, probably don't want to limit to string
};

export type AuthFormType = {
  [key: string]: string;
};

export type AuthAddMessage = (text: string) => void;

export type AuthOnSubmit = (
  form: AuthFormType,
  event: FormEvent<HTMLFormElement>
) => Promise<AuthResponse | AuthTokenResponse>;

export type AuthOnSuccess = (
  (data: AuthResponse | { user: User | null; session: Session | null; }) => void
);

export type AuthOnValidate = ({
  addError,
  addInfo,
  addSuccess,
  addWarning,
  form,
}: {
  addError: AuthAddMessage;
  addInfo: AuthAddMessage;
  addSuccess: AuthAddMessage;
  addWarning: AuthAddMessage;
  form: AuthFormType;
}) => boolean;

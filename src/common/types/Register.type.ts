export interface Register {
  email: string;
  username: string;
  password: string;
}

export interface RegistrationForm extends Register {
  repeatPassword: string;
}

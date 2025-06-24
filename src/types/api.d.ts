type UserInfo = {
  id: number;
  name: string;
  phone: string;
  role: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

type UserLogin = {
  phone: string;
  password: string;
};

type UserRegister = {
  name: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
};

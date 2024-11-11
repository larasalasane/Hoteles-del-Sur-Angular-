export class UserModel {
  id: string | undefined;
  user : User| undefined;
}

export class User {
  id: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  password: string | undefined;
  role : Role = Role.USER_ROLE;

  constructor(firstName: string, lastName: string, email: string, phoneNumber: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
}

export enum Role {
  USER_ROLE,
  ADMIN_ROLE
}

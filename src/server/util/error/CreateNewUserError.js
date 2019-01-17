import { GraphQLError } from 'graphql';

class UserSignupGenericError extends GraphQLError {
  constructor(errors) {
    super('Error encountered while creating new User.');
  }
}
class UserLoginGenericError extends GraphQLError {
  constructor(errors) {
    super('Error encountered while loggin in.');
  }
}

class PasswordHashError extends GraphQLError{
  constructor(errors){
    super("Error encountered with the given password. Please try a different one.");
  }
}

class DuplicateUserNameError extends GraphQLError{
  constructor(errors){
    super("Username already exists. Please try a different one.");
  }
}

export {UserLoginGenericError,
  UserSignupGenericError,
  DuplicateUserNameError,
  PasswordHashError
};
import { GraphQLError } from 'graphql';

class GenericError extends GraphQLError {
  constructor(errors) {
    super('Error encountered while creating new User.');
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

export {GenericError,DuplicateUserNameError,PasswordHashError};
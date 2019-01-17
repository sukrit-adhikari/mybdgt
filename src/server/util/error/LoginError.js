import { GraphQLError } from 'graphql';

class PasswordUsernameMismatch extends GraphQLError {
  constructor(errors) {
    super('Username/Password combination can not be verified. Please try again.');
  }
}

export {PasswordUsernameMismatch};
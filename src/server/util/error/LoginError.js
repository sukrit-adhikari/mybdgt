import { GraphQLError } from 'graphql';

class PasswordUsernameMismatch extends GraphQLError {
  constructor(errors) {
    super('Username/Password mismatch.Please try again.');
  }
}

export {PasswordUsernameMismatch};
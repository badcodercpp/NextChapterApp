import {
  BaseGraphQLAccessor,
  INITIATE_VERIFY_EMAIL_OTP,
} from '@/graphql-communicator';
import {
  VerifyEmailOtpMutation,
  VerifyEmailOtpMutationVariables,
} from '@/__generated__/graphql';

export class VerifyEmailOtpAccessor extends BaseGraphQLAccessor<
  VerifyEmailOtpMutationVariables,
  VerifyEmailOtpMutation
> {
  async execute(variables: VerifyEmailOtpMutationVariables) {
    const graphqlGuardedClient = await this.getGuardedClient();

    const response = await graphqlGuardedClient.mutate({
      mutation: INITIATE_VERIFY_EMAIL_OTP,
      variables,
    });
    return response;
  }
}

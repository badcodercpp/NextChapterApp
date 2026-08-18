import {
  BaseGraphQLAccessor,
  INITIATE_RESEND_EMAIL_VERIFICATION_OTP,
} from '@/graphql-communicator';
import {
  ResendEmailVerificationOtpMutation,
  ResendEmailVerificationOtpMutationVariables,
} from '@/__generated__/graphql';

export class ResendEmailVerificationOtpAccessor extends BaseGraphQLAccessor<
  ResendEmailVerificationOtpMutationVariables,
  ResendEmailVerificationOtpMutation
> {
  async execute(variables: ResendEmailVerificationOtpMutationVariables) {
    const graphqlGuardedClient = await this.getGuardedClient();

    const response = await graphqlGuardedClient.mutate({
      mutation: INITIATE_RESEND_EMAIL_VERIFICATION_OTP,
      variables,
    });
    return response;
  }
}

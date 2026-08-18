/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
/** Auth Provider */
export type AuthProvider =
  | 'APPLE'
  | 'EMAIL'
  | 'GOOGLE';

/** Conversation Role */
export type ConversationRole =
  | 'ASSISTANT'
  | 'USER';

/** Device Platform */
export type DevicePlatform =
  | 'ANDROID'
  | 'IOS'
  | 'WEB';

/** Device Type */
export type DeviceType =
  | 'DESKTOP'
  | 'HANDSET'
  | 'PHONE'
  | 'TABLET';

export type FollowUpInput = {
  answer: string;
  questionHistoryId: string | number;
};

/** User gender */
export type Gender =
  | 'FEMALE'
  | 'MALE'
  | 'OTHER'
  | 'PREFER_NOT_TO_SAY';

/** Journey Status */
export type JourneyStatus =
  | 'ACTIVE'
  | 'COMPLETED'
  | 'PAUSED';

export type LoginInput = {
  appVersion?: string | null | undefined;
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  email: string;
  ipAddress?: string | null | undefined;
  password: string;
  platform: DevicePlatform;
  userAgent?: string | null | undefined;
};

/** Question Status */
export type QuestionStatus =
  | 'ACTIVE'
  | 'COMPLETED';

/** Recovery Program */
export type RecoveryProgram =
  | 'BREAKUP'
  | 'BURNOUT'
  | 'EXPLORING'
  | 'GRIEF'
  | 'LIFE_TRANSITION';

export type RefreshTokenInput = {
  refreshToken: string;
};

export type RegisterInput = {
  appVersion?: string | null | undefined;
  authProvider?: AuthProvider | null | undefined;
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  displayName: string;
  email: string;
  gender?: Gender | null | undefined;
  ipAddress?: string | null | undefined;
  password: string;
  platform: DevicePlatform;
  userAgent?: string | null | undefined;
};

export type ResendEmailOtpInput = {
  /** Registered email address */
  email: string;
};

export type StartJourneyInput = {
  program?: RecoveryProgram | null | undefined;
};

export type UpdateProfileInput = {
  avatarUrl?: string | null | undefined;
  displayName?: string | null | undefined;
  gender?: Gender | null | undefined;
  locale?: string | null | undefined;
  timezone?: string | null | undefined;
};

export type VerifyChangePasswordOtpInput = {
  currentPassword: string;
  newPassword: string;
  otp: string;
};

export type VerifyEmailOtpInput = {
  appVersion?: string | null | undefined;
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  /** Registered email address */
  email: string;
  ipAddress?: string | null | undefined;
  /** One-time password */
  otp: string;
  platform: DevicePlatform;
  userAgent?: string | null | undefined;
};

export type CompleteJourneyMutationVariables = Exact<{ [key: string]: never; }>;


export type CompleteJourneyMutation = { completeJourney: { id: string, status: JourneyStatus, currentDay: number, currentRecoveryScore: number, completedAt: unknown, updatedAt: unknown } };

export type FollowUpMutationVariables = Exact<{
  input: FollowUpInput;
}>;


export type FollowUpMutation = { followUp: { id: string, status: QuestionStatus, conversation: Array<{ role: ConversationRole, content: string | null, reflection: string | null, insight: string | null, question: string | null, summary: string | null, createdAt: unknown }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: boolean };

export type LogoutAllMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutAllMutation = { logoutAll: boolean };

export type PauseJourneyMutationVariables = Exact<{ [key: string]: never; }>;


export type PauseJourneyMutation = { pauseJourney: { id: string, status: JourneyStatus, currentDay: number, currentRecoveryScore: number, pausedAt: unknown, updatedAt: unknown } };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type RefreshTokenMutation = { refreshToken: { accessToken: string, refreshToken: string } };

export type RequestChangePasswordOtpMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestChangePasswordOtpMutation = { requestChangePasswordOtp: boolean };

export type ResumeJourneyMutationVariables = Exact<{ [key: string]: never; }>;


export type ResumeJourneyMutation = { resumeJourney: { id: string, status: JourneyStatus, currentDay: number, currentRecoveryScore: number, pausedAt: unknown, updatedAt: unknown } };

export type StartJourneyMutationVariables = Exact<{
  input: StartJourneyInput;
}>;


export type StartJourneyMutation = { startJourney: { id: string, userId: string, program: RecoveryProgram, status: JourneyStatus, currentDay: number, currentRecoveryScore: number, startedAt: unknown, pausedAt: unknown, completedAt: unknown, createdAt: unknown, updatedAt: unknown } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { updateProfile: { id: string, email: string, displayName: string, gender: Gender | null, avatarUrl: string | null, timezone: string | null, locale: string | null, emailVerified: boolean, isActive: boolean, createdAt: unknown, updatedAt: unknown } };

export type VerifyChangePasswordOtpMutationVariables = Exact<{
  input: VerifyChangePasswordOtpInput;
}>;


export type VerifyChangePasswordOtpMutation = { verifyChangePasswordOtp: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { login: { accessToken: string, refreshToken: string } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { register: boolean };

export type ResendEmailVerificationOtpMutationVariables = Exact<{
  input: ResendEmailOtpInput;
}>;


export type ResendEmailVerificationOtpMutation = { resendEmailVerificationOtp: boolean };

export type VerifyEmailOtpMutationVariables = Exact<{
  input: VerifyEmailOtpInput;
}>;


export type VerifyEmailOtpMutation = { verifyEmailOtp: { accessToken: string, refreshToken: string } };

export type ActiveJourneyQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveJourneyQuery = { activeJourney: { id: string, userId: string, program: RecoveryProgram, status: JourneyStatus, currentDay: number, currentRecoveryScore: number, startedAt: unknown, pausedAt: unknown, completedAt: unknown, createdAt: unknown, updatedAt: unknown } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { id: string, email: string, displayName: string, gender: Gender | null, avatarUrl: string | null, timezone: string | null, locale: string | null, emailVerified: boolean, isActive: boolean, createdAt: unknown, updatedAt: unknown } };

export type TodayQuestionQueryVariables = Exact<{ [key: string]: never; }>;


export type TodayQuestionQuery = { todayQuestion: { id: string, journeyId: string, missionId: string, day: number, status: QuestionStatus, askedAt: unknown, conversation: Array<{ role: ConversationRole, content: string | null, createdAt: unknown }> } };


export const CompleteJourneyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteJourney"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeJourney"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentDay"}},{"kind":"Field","name":{"kind":"Name","value":"currentRecoveryScore"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CompleteJourneyMutation, CompleteJourneyMutationVariables>;
export const FollowUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"conversation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"reflection"}},{"kind":"Field","name":{"kind":"Name","value":"insight"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<FollowUpMutation, FollowUpMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const LogoutAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutAll"}}]}}]} as unknown as DocumentNode<LogoutAllMutation, LogoutAllMutationVariables>;
export const PauseJourneyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PauseJourney"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pauseJourney"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentDay"}},{"kind":"Field","name":{"kind":"Name","value":"currentRecoveryScore"}},{"kind":"Field","name":{"kind":"Name","value":"pausedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PauseJourneyMutation, PauseJourneyMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RequestChangePasswordOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestChangePasswordOtp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestChangePasswordOtp"}}]}}]} as unknown as DocumentNode<RequestChangePasswordOtpMutation, RequestChangePasswordOtpMutationVariables>;
export const ResumeJourneyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResumeJourney"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resumeJourney"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentDay"}},{"kind":"Field","name":{"kind":"Name","value":"currentRecoveryScore"}},{"kind":"Field","name":{"kind":"Name","value":"pausedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ResumeJourneyMutation, ResumeJourneyMutationVariables>;
export const StartJourneyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartJourney"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StartJourneyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startJourney"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"program"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentDay"}},{"kind":"Field","name":{"kind":"Name","value":"currentRecoveryScore"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"pausedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<StartJourneyMutation, StartJourneyMutationVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const VerifyChangePasswordOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyChangePasswordOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyChangePasswordOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyChangePasswordOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<VerifyChangePasswordOtpMutation, VerifyChangePasswordOtpMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ResendEmailVerificationOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendEmailVerificationOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResendEmailOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendEmailVerificationOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ResendEmailVerificationOtpMutation, ResendEmailVerificationOtpMutationVariables>;
export const VerifyEmailOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmailOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyEmailOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmailOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<VerifyEmailOtpMutation, VerifyEmailOtpMutationVariables>;
export const ActiveJourneyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ActiveJourney"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeJourney"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"program"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentDay"}},{"kind":"Field","name":{"kind":"Name","value":"currentRecoveryScore"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"pausedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ActiveJourneyQuery, ActiveJourneyQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const TodayQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TodayQuestion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"todayQuestion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"journeyId"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"askedAt"}},{"kind":"Field","name":{"kind":"Name","value":"conversation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<TodayQuestionQuery, TodayQuestionQueryVariables>;
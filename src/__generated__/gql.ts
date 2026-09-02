/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CompleteJourney {\n    completeJourney {\n      id\n      status\n      currentDay\n      currentRecoveryScore\n      completedAt\n      updatedAt\n    }\n  }\n": typeof types.CompleteJourneyDocument,
    "\n  mutation FollowUp($input: FollowUpInput!) {\n    followUp(input: $input) {\n      id\n      status\n      conversation {\n        role\n        content\n        reflection\n        insight\n        question\n        summary\n        createdAt\n      }\n    }\n  }\n": typeof types.FollowUpDocument,
    "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument,
    "\n  mutation LogoutAll {\n    logoutAll\n  }\n": typeof types.LogoutAllDocument,
    "\n  mutation PauseJourney {\n    pauseJourney {\n      id\n      status\n      currentDay\n      currentRecoveryScore\n      pausedAt\n      updatedAt\n    }\n  }\n": typeof types.PauseJourneyDocument,
    "\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.RefreshTokenDocument,
    "\n  mutation RequestChangePasswordOtp {\n    requestChangePasswordOtp\n  }\n": typeof types.RequestChangePasswordOtpDocument,
    "\n  mutation ResumeJourney {\n    resumeJourney {\n      id\n      status\n      currentDay\n      currentRecoveryScore\n      pausedAt\n      updatedAt\n    }\n  }\n": typeof types.ResumeJourneyDocument,
    "\n  mutation StartJourney($input: StartJourneyInput!) {\n    startJourney(input: $input) {\n      id\n      userId\n      program\n      status\n      currentDay\n      currentRecoveryScore\n      startedAt\n      pausedAt\n      completedAt\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.StartJourneyDocument,
    "\n  mutation UpdateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      email\n      displayName\n      gender\n      avatarUrl\n      timezone\n      locale\n      emailVerified\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateProfileDocument,
    "\n  mutation VerifyChangePasswordOtp($input: VerifyChangePasswordOtpInput!) {\n    verifyChangePasswordOtp(input: $input)\n  }\n": typeof types.VerifyChangePasswordOtpDocument,
    "\n  mutation GoogleLogin($input: GoogleLoginInput!) {\n    googleLogin(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.GoogleLoginDocument,
    "\n  mutation GoogleRegister($input: GoogleRegisterInput!) {\n    googleRegister(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.GoogleRegisterDocument,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input)\n  }\n": typeof types.RegisterDocument,
    "\n  mutation ResendEmailVerificationOtp($input: ResendEmailOtpInput!) {\n    resendEmailVerificationOtp(input: $input)\n  }\n": typeof types.ResendEmailVerificationOtpDocument,
    "\n  mutation VerifyEmailOtp($input: VerifyEmailOtpInput!) {\n    verifyEmailOtp(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.VerifyEmailOtpDocument,
    "\n  query ActiveJourney {\n    activeJourney {\n      id\n      userId\n      program\n      status\n      currentDay\n      currentRecoveryScore\n      startedAt\n      pausedAt\n      completedAt\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.ActiveJourneyDocument,
    "\n  query Me {\n    me {\n      id\n      email\n      displayName\n      gender\n      avatarUrl\n      timezone\n      locale\n      emailVerified\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.MeDocument,
    "\n  query TodayQuestion {\n    todayQuestion {\n      id\n      journeyId\n      missionId\n      day\n      status\n      askedAt\n      conversation {\n        role\n        content\n        createdAt\n      }\n    }\n  }\n": typeof types.TodayQuestionDocument,
    "\n  mutation RegisterDevice($input: DeviceInfoInput!) {\n    registerDevice(input: $input)\n  }\n": typeof types.RegisterDeviceDocument,
    "\n  query GetRecoveryReason {\n    getRecoveryReason\n  }\n": typeof types.GetRecoveryReasonDocument,
    "\n  query GetRecoveryTimeline {\n    getRecoveryTimeline\n  }\n": typeof types.GetRecoveryTimelineDocument,
    "\n  query GetRecoveryFeeling {\n    getRecoveryFeeling\n  }\n": typeof types.GetRecoveryFeelingDocument,
    "\n  query GetRecoveryGoal {\n    getRecoveryGoal\n  }\n": typeof types.GetRecoveryGoalDocument,
};
const documents: Documents = {
    "\n  mutation CompleteJourney {\n    completeJourney {\n      id\n      status\n      currentDay\n      currentRecoveryScore\n      completedAt\n      updatedAt\n    }\n  }\n": types.CompleteJourneyDocument,
    "\n  mutation FollowUp($input: FollowUpInput!) {\n    followUp(input: $input) {\n      id\n      status\n      conversation {\n        role\n        content\n        reflection\n        insight\n        question\n        summary\n        createdAt\n      }\n    }\n  }\n": types.FollowUpDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation LogoutAll {\n    logoutAll\n  }\n": types.LogoutAllDocument,
    "\n  mutation PauseJourney {\n    pauseJourney {\n      id\n      status\n      currentDay\n      currentRecoveryScore\n      pausedAt\n      updatedAt\n    }\n  }\n": types.PauseJourneyDocument,
    "\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation RequestChangePasswordOtp {\n    requestChangePasswordOtp\n  }\n": types.RequestChangePasswordOtpDocument,
    "\n  mutation ResumeJourney {\n    resumeJourney {\n      id\n      status\n      currentDay\n      currentRecoveryScore\n      pausedAt\n      updatedAt\n    }\n  }\n": types.ResumeJourneyDocument,
    "\n  mutation StartJourney($input: StartJourneyInput!) {\n    startJourney(input: $input) {\n      id\n      userId\n      program\n      status\n      currentDay\n      currentRecoveryScore\n      startedAt\n      pausedAt\n      completedAt\n      createdAt\n      updatedAt\n    }\n  }\n": types.StartJourneyDocument,
    "\n  mutation UpdateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      email\n      displayName\n      gender\n      avatarUrl\n      timezone\n      locale\n      emailVerified\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  mutation VerifyChangePasswordOtp($input: VerifyChangePasswordOtpInput!) {\n    verifyChangePasswordOtp(input: $input)\n  }\n": types.VerifyChangePasswordOtpDocument,
    "\n  mutation GoogleLogin($input: GoogleLoginInput!) {\n    googleLogin(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.GoogleLoginDocument,
    "\n  mutation GoogleRegister($input: GoogleRegisterInput!) {\n    googleRegister(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.GoogleRegisterDocument,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input)\n  }\n": types.RegisterDocument,
    "\n  mutation ResendEmailVerificationOtp($input: ResendEmailOtpInput!) {\n    resendEmailVerificationOtp(input: $input)\n  }\n": types.ResendEmailVerificationOtpDocument,
    "\n  mutation VerifyEmailOtp($input: VerifyEmailOtpInput!) {\n    verifyEmailOtp(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.VerifyEmailOtpDocument,
    "\n  query ActiveJourney {\n    activeJourney {\n      id\n      userId\n      program\n      status\n      currentDay\n      currentRecoveryScore\n      startedAt\n      pausedAt\n      completedAt\n      createdAt\n      updatedAt\n    }\n  }\n": types.ActiveJourneyDocument,
    "\n  query Me {\n    me {\n      id\n      email\n      displayName\n      gender\n      avatarUrl\n      timezone\n      locale\n      emailVerified\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": types.MeDocument,
    "\n  query TodayQuestion {\n    todayQuestion {\n      id\n      journeyId\n      missionId\n      day\n      status\n      askedAt\n      conversation {\n        role\n        content\n        createdAt\n      }\n    }\n  }\n": types.TodayQuestionDocument,
    "\n  mutation RegisterDevice($input: DeviceInfoInput!) {\n    registerDevice(input: $input)\n  }\n": types.RegisterDeviceDocument,
    "\n  query GetRecoveryReason {\n    getRecoveryReason\n  }\n": types.GetRecoveryReasonDocument,
    "\n  query GetRecoveryTimeline {\n    getRecoveryTimeline\n  }\n": types.GetRecoveryTimelineDocument,
    "\n  query GetRecoveryFeeling {\n    getRecoveryFeeling\n  }\n": types.GetRecoveryFeelingDocument,
    "\n  query GetRecoveryGoal {\n    getRecoveryGoal\n  }\n": types.GetRecoveryGoalDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CompleteJourney {\n    completeJourney {\n      id\n      status\n      currentDay\n      currentRecoveryScore\n      completedAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CompleteJourney {\n    completeJourney {\n      id\n      status\n      currentDay\n      currentRecoveryScore\n      completedAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FollowUp($input: FollowUpInput!) {\n    followUp(input: $input) {\n      id\n      status\n      conversation {\n        role\n        content\n        reflection\n        insight\n        question\n        summary\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation FollowUp($input: FollowUpInput!) {\n    followUp(input: $input) {\n      id\n      status\n      conversation {\n        role\n        content\n        reflection\n        insight\n        question\n        summary\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogoutAll {\n    logoutAll\n  }\n"): (typeof documents)["\n  mutation LogoutAll {\n    logoutAll\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PauseJourney {\n    pauseJourney {\n      id\n      status\n      currentDay\n      currentRecoveryScore\n      pausedAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation PauseJourney {\n    pauseJourney {\n      id\n      status\n      currentDay\n      currentRecoveryScore\n      pausedAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RequestChangePasswordOtp {\n    requestChangePasswordOtp\n  }\n"): (typeof documents)["\n  mutation RequestChangePasswordOtp {\n    requestChangePasswordOtp\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResumeJourney {\n    resumeJourney {\n      id\n      status\n      currentDay\n      currentRecoveryScore\n      pausedAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation ResumeJourney {\n    resumeJourney {\n      id\n      status\n      currentDay\n      currentRecoveryScore\n      pausedAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StartJourney($input: StartJourneyInput!) {\n    startJourney(input: $input) {\n      id\n      userId\n      program\n      status\n      currentDay\n      currentRecoveryScore\n      startedAt\n      pausedAt\n      completedAt\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation StartJourney($input: StartJourneyInput!) {\n    startJourney(input: $input) {\n      id\n      userId\n      program\n      status\n      currentDay\n      currentRecoveryScore\n      startedAt\n      pausedAt\n      completedAt\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      email\n      displayName\n      gender\n      avatarUrl\n      timezone\n      locale\n      emailVerified\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      email\n      displayName\n      gender\n      avatarUrl\n      timezone\n      locale\n      emailVerified\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyChangePasswordOtp($input: VerifyChangePasswordOtpInput!) {\n    verifyChangePasswordOtp(input: $input)\n  }\n"): (typeof documents)["\n  mutation VerifyChangePasswordOtp($input: VerifyChangePasswordOtpInput!) {\n    verifyChangePasswordOtp(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GoogleLogin($input: GoogleLoginInput!) {\n    googleLogin(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation GoogleLogin($input: GoogleLoginInput!) {\n    googleLogin(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GoogleRegister($input: GoogleRegisterInput!) {\n    googleRegister(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation GoogleRegister($input: GoogleRegisterInput!) {\n    googleRegister(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input)\n  }\n"): (typeof documents)["\n  mutation Register($input: RegisterInput!) {\n    register(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResendEmailVerificationOtp($input: ResendEmailOtpInput!) {\n    resendEmailVerificationOtp(input: $input)\n  }\n"): (typeof documents)["\n  mutation ResendEmailVerificationOtp($input: ResendEmailOtpInput!) {\n    resendEmailVerificationOtp(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyEmailOtp($input: VerifyEmailOtpInput!) {\n    verifyEmailOtp(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyEmailOtp($input: VerifyEmailOtpInput!) {\n    verifyEmailOtp(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ActiveJourney {\n    activeJourney {\n      id\n      userId\n      program\n      status\n      currentDay\n      currentRecoveryScore\n      startedAt\n      pausedAt\n      completedAt\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query ActiveJourney {\n    activeJourney {\n      id\n      userId\n      program\n      status\n      currentDay\n      currentRecoveryScore\n      startedAt\n      pausedAt\n      completedAt\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      email\n      displayName\n      gender\n      avatarUrl\n      timezone\n      locale\n      emailVerified\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      email\n      displayName\n      gender\n      avatarUrl\n      timezone\n      locale\n      emailVerified\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TodayQuestion {\n    todayQuestion {\n      id\n      journeyId\n      missionId\n      day\n      status\n      askedAt\n      conversation {\n        role\n        content\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query TodayQuestion {\n    todayQuestion {\n      id\n      journeyId\n      missionId\n      day\n      status\n      askedAt\n      conversation {\n        role\n        content\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterDevice($input: DeviceInfoInput!) {\n    registerDevice(input: $input)\n  }\n"): (typeof documents)["\n  mutation RegisterDevice($input: DeviceInfoInput!) {\n    registerDevice(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecoveryReason {\n    getRecoveryReason\n  }\n"): (typeof documents)["\n  query GetRecoveryReason {\n    getRecoveryReason\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecoveryTimeline {\n    getRecoveryTimeline\n  }\n"): (typeof documents)["\n  query GetRecoveryTimeline {\n    getRecoveryTimeline\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecoveryFeeling {\n    getRecoveryFeeling\n  }\n"): (typeof documents)["\n  query GetRecoveryFeeling {\n    getRecoveryFeeling\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRecoveryGoal {\n    getRecoveryGoal\n  }\n"): (typeof documents)["\n  query GetRecoveryGoal {\n    getRecoveryGoal\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
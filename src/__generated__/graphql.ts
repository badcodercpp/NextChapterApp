/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { api } from '@/api/baseApi';
/** Auth Provider */
export enum AuthProvider {
  Apple = 'APPLE',
  Email = 'EMAIL',
  Google = 'GOOGLE'
}

/** Conversation Role */
export enum ConversationRole {
  Assistant = 'ASSISTANT',
  User = 'USER'
}

export type DeviceInfoInput = {
  appVersion?: string | null | undefined;
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  ipAddress?: string | null | undefined;
  platform: DevicePlatform;
  userAgent?: string | null | undefined;
};

/** Device Platform */
export enum DevicePlatform {
  Android = 'ANDROID',
  Ios = 'IOS',
  Web = 'WEB'
}

/** Device Type */
export enum DeviceType {
  Desktop = 'DESKTOP',
  Handset = 'HANDSET',
  Phone = 'PHONE',
  Tablet = 'TABLET'
}

export type FollowUpInput = {
  answer: string;
  questionHistoryId: string | number;
};

/** User gender */
export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
  PreferNotToSay = 'PREFER_NOT_TO_SAY'
}

export type GoogleLoginInput = {
  appVersion?: string | null | undefined;
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  idToken: string;
  ipAddress?: string | null | undefined;
  platform: DevicePlatform;
  userAgent?: string | null | undefined;
};

export type GoogleRegisterInput = {
  appVersion?: string | null | undefined;
  authProvider?: AuthProvider | null | undefined;
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  displayName?: string | null | undefined;
  gender?: Gender | null | undefined;
  howAreYouFeeling?: Array<RecoveryReasonCurrentFeeling>;
  howLongHasItBeen?: RecoveryReasonTimeline;
  idToken: string;
  ipAddress?: string | null | undefined;
  platform: DevicePlatform;
  userAgent?: string | null | undefined;
  whatBringsYouHere?: RecoveryReason;
  whatWouldYouLikeHelpWith?: RecoveryReasonEndGoal;
};

/** Journey Status */
export enum JourneyStatus {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Paused = 'PAUSED'
}

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

/** Mission Category */
export enum MissionCategory {
  Acceptance = 'ACCEPTANCE',
  Boundaries = 'BOUNDARIES',
  Connection = 'CONNECTION',
  EmotionalHealing = 'EMOTIONAL_HEALING',
  Growth = 'GROWTH',
  Habits = 'HABITS',
  Purpose = 'PURPOSE',
  SelfWorth = 'SELF_WORTH'
}

/** Mission Difficulty */
export enum MissionDifficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
}

/** Mission Impact */
export enum MissionImpact {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

/** Mission Time */
export enum MissionTime {
  Afternoon = 'AFTERNOON',
  AllDay = 'ALL_DAY',
  Anytime = 'ANYTIME',
  Evening = 'EVENING',
  Morning = 'MORNING'
}

/** Question Status */
export enum QuestionStatus {
  Active = 'ACTIVE',
  Completed = 'COMPLETED'
}

/** Recovery Program */
export enum RecoveryProgram {
  Breakup = 'BREAKUP',
  Burnout = 'BURNOUT',
  Exploring = 'EXPLORING',
  Grief = 'GRIEF',
  LifeTransition = 'LIFE_TRANSITION'
}

/** Recovery Reason */
export enum RecoveryReason {
  Breakup = 'Breakup',
  Burnout = 'Burnout',
  Divorce = 'Divorce',
  Grief = 'Grief',
  Growth = 'Growth',
  Lonely = 'Lonely'
}

/** Recovery Reason Current Feeling */
export enum RecoveryReasonCurrentFeeling {
  Angry = 'Angry',
  Anxious = 'Anxious',
  Confident = 'Confident',
  Grateful = 'Grateful',
  Heartbroken = 'Heartbroken',
  Hopeful = 'Hopeful',
  Lonely = 'Lonely',
  Numb = 'Numb',
  Sad = 'Sad'
}

/** Recovery Reason End Goal */
export enum RecoveryReasonEndGoal {
  Confidence = 'Confidence',
  Heal = 'Heal',
  Motivation = 'Motivation',
  MoveOn = 'MoveOn',
  Overthinking = 'Overthinking',
  Profile = 'Profile',
  Sleep = 'Sleep'
}

/** Recovery Reason Timeline */
export enum RecoveryReasonTimeline {
  Month = 'Month',
  Months = 'Months',
  Today = 'Today',
  Week = 'Week',
  Year = 'Year'
}

/** Recovery Trend */
export enum RecoveryTrend {
  Down = 'DOWN',
  Unchanged = 'UNCHANGED',
  Up = 'UP'
}

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
  howAreYouFeeling?: Array<RecoveryReasonCurrentFeeling>;
  howLongHasItBeen?: RecoveryReasonTimeline;
  ipAddress?: string | null | undefined;
  password: string;
  platform: DevicePlatform;
  userAgent?: string | null | undefined;
  whatBringsYouHere?: RecoveryReason;
  whatWouldYouLikeHelpWith?: RecoveryReasonEndGoal;
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

export type GoogleLoginMutationVariables = Exact<{
  input: GoogleLoginInput;
}>;


export type GoogleLoginMutation = { googleLogin: { accessToken: string, refreshToken: string } };

export type GoogleRegisterMutationVariables = Exact<{
  input: GoogleRegisterInput;
}>;


export type GoogleRegisterMutation = { googleRegister: { accessToken: string, refreshToken: string } };

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

export type ApplicationConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type ApplicationConfigQuery = { applicationConfig: { id: string, totalProgramDays: number, aiCoachName: string, aiCoachMessage: string, createdAt: unknown, updatedAt: unknown } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { id: string, email: string, displayName: string, gender: Gender | null, avatarUrl: string | null, timezone: string | null, locale: string | null, emailVerified: boolean, isActive: boolean, createdAt: unknown, updatedAt: unknown } };

export type MotivationalMessageQueryVariables = Exact<{ [key: string]: never; }>;


export type MotivationalMessageQuery = { motivationalMessage: { id: string, title: string, description: string } };

export type MyRecoveryQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRecoveryQuery = { myRecovery: { id: string, userId: string, overallScore: number, previousScore: number | null, scoreChange: number | null, trend: RecoveryTrend | null, emotionalDistress: number, acceptance: number, selfAwareness: number, selfWorth: number, emotionalStability: number, readinessToMoveForward: number, assessmentCount: number, createdAt: unknown, updatedAt: unknown } };

export type RecoveryAssessmentHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type RecoveryAssessmentHistoryQuery = { recoveryAssessmentHistory: Array<{ id: string, userId: string, journeyId: string, dailySessionId: string, overallScore: number, emotionalDistress: number, acceptance: number, selfAwareness: number, selfWorth: number, emotionalStability: number, readinessToMoveForward: number, createdAt: unknown, updatedAt: unknown }> };

export type RecoveryScoreTrendForLastNDaysQueryVariables = Exact<{
  days: number;
}>;


export type RecoveryScoreTrendForLastNDaysQuery = { recoveryScoreTrendForLastNDays: Array<{ assessmentId: string | null, day: number, score: number | null, previousScore: number | null, scoreChange: number | null, trend: RecoveryTrend | null, createdAt: unknown }> };

export type TodayMissionQueryVariables = Exact<{
  journeyId: string | number;
  day: number;
}>;


export type TodayMissionQuery = { todayMission: { id: string, journeyId: string, day: number, title: string, description: string, overview: string, reminder: string, category: MissionCategory, difficulty: MissionDifficulty, impact: MissionImpact, time: MissionTime, createdAt: unknown, updatedAt: unknown } };

export type TodayQuestionQueryVariables = Exact<{ [key: string]: never; }>;


export type TodayQuestionQuery = { todayQuestion: { id: string, journeyId: string, missionId: string, day: number, status: QuestionStatus, askedAt: unknown, answeredAt: unknown, createdAt: unknown, updatedAt: unknown, conversation: Array<{ role: ConversationRole, content: string | null, question: string | null, reflection: string | null, insight: string | null, createdAt: unknown }> } };

export type RegisterDeviceMutationVariables = Exact<{
  input: DeviceInfoInput;
}>;


export type RegisterDeviceMutation = { registerDevice: boolean };

export type GetRecoveryFeelingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecoveryFeelingQuery = { getRecoveryFeeling: RecoveryReasonCurrentFeeling };

export type GetRecoveryGoalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecoveryGoalQuery = { getRecoveryGoal: RecoveryReasonEndGoal };

export type GetRecoveryReasonQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecoveryReasonQuery = { getRecoveryReason: RecoveryReason };

export type GetRecoveryTimelineQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecoveryTimelineQuery = { getRecoveryTimeline: RecoveryReasonTimeline };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const CompleteJourneyDocument = new TypedDocumentString(`
    mutation CompleteJourney {
  completeJourney {
    id
    status
    currentDay
    currentRecoveryScore
    completedAt
    updatedAt
  }
}
    `);
export const FollowUpDocument = new TypedDocumentString(`
    mutation FollowUp($input: FollowUpInput!) {
  followUp(input: $input) {
    id
    status
    conversation {
      role
      content
      reflection
      insight
      question
      summary
      createdAt
    }
  }
}
    `);
export const LogoutDocument = new TypedDocumentString(`
    mutation Logout {
  logout
}
    `);
export const LogoutAllDocument = new TypedDocumentString(`
    mutation LogoutAll {
  logoutAll
}
    `);
export const PauseJourneyDocument = new TypedDocumentString(`
    mutation PauseJourney {
  pauseJourney {
    id
    status
    currentDay
    currentRecoveryScore
    pausedAt
    updatedAt
  }
}
    `);
export const RefreshTokenDocument = new TypedDocumentString(`
    mutation RefreshToken($input: RefreshTokenInput!) {
  refreshToken(input: $input) {
    accessToken
    refreshToken
  }
}
    `);
export const RequestChangePasswordOtpDocument = new TypedDocumentString(`
    mutation RequestChangePasswordOtp {
  requestChangePasswordOtp
}
    `);
export const ResumeJourneyDocument = new TypedDocumentString(`
    mutation ResumeJourney {
  resumeJourney {
    id
    status
    currentDay
    currentRecoveryScore
    pausedAt
    updatedAt
  }
}
    `);
export const StartJourneyDocument = new TypedDocumentString(`
    mutation StartJourney($input: StartJourneyInput!) {
  startJourney(input: $input) {
    id
    userId
    program
    status
    currentDay
    currentRecoveryScore
    startedAt
    pausedAt
    completedAt
    createdAt
    updatedAt
  }
}
    `);
export const UpdateProfileDocument = new TypedDocumentString(`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    email
    displayName
    gender
    avatarUrl
    timezone
    locale
    emailVerified
    isActive
    createdAt
    updatedAt
  }
}
    `);
export const VerifyChangePasswordOtpDocument = new TypedDocumentString(`
    mutation VerifyChangePasswordOtp($input: VerifyChangePasswordOtpInput!) {
  verifyChangePasswordOtp(input: $input)
}
    `);
export const GoogleLoginDocument = new TypedDocumentString(`
    mutation GoogleLogin($input: GoogleLoginInput!) {
  googleLogin(input: $input) {
    accessToken
    refreshToken
  }
}
    `);
export const GoogleRegisterDocument = new TypedDocumentString(`
    mutation GoogleRegister($input: GoogleRegisterInput!) {
  googleRegister(input: $input) {
    accessToken
    refreshToken
  }
}
    `);
export const LoginDocument = new TypedDocumentString(`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    refreshToken
  }
}
    `);
export const RegisterDocument = new TypedDocumentString(`
    mutation Register($input: RegisterInput!) {
  register(input: $input)
}
    `);
export const ResendEmailVerificationOtpDocument = new TypedDocumentString(`
    mutation ResendEmailVerificationOtp($input: ResendEmailOtpInput!) {
  resendEmailVerificationOtp(input: $input)
}
    `);
export const VerifyEmailOtpDocument = new TypedDocumentString(`
    mutation VerifyEmailOtp($input: VerifyEmailOtpInput!) {
  verifyEmailOtp(input: $input) {
    accessToken
    refreshToken
  }
}
    `);
export const ActiveJourneyDocument = new TypedDocumentString(`
    query ActiveJourney {
  activeJourney {
    id
    userId
    program
    status
    currentDay
    currentRecoveryScore
    startedAt
    pausedAt
    completedAt
    createdAt
    updatedAt
  }
}
    `);
export const ApplicationConfigDocument = new TypedDocumentString(`
    query ApplicationConfig {
  applicationConfig {
    id
    totalProgramDays
    aiCoachName
    aiCoachMessage
    createdAt
    updatedAt
  }
}
    `);
export const MeDocument = new TypedDocumentString(`
    query Me {
  me {
    id
    email
    displayName
    gender
    avatarUrl
    timezone
    locale
    emailVerified
    isActive
    createdAt
    updatedAt
  }
}
    `);
export const MotivationalMessageDocument = new TypedDocumentString(`
    query MotivationalMessage {
  motivationalMessage {
    id
    title
    description
  }
}
    `);
export const MyRecoveryDocument = new TypedDocumentString(`
    query MyRecovery {
  myRecovery {
    id
    userId
    overallScore
    previousScore
    scoreChange
    trend
    emotionalDistress
    acceptance
    selfAwareness
    selfWorth
    emotionalStability
    readinessToMoveForward
    assessmentCount
    createdAt
    updatedAt
  }
}
    `);
export const RecoveryAssessmentHistoryDocument = new TypedDocumentString(`
    query RecoveryAssessmentHistory {
  recoveryAssessmentHistory {
    id
    userId
    journeyId
    dailySessionId
    overallScore
    emotionalDistress
    acceptance
    selfAwareness
    selfWorth
    emotionalStability
    readinessToMoveForward
    createdAt
    updatedAt
  }
}
    `);
export const RecoveryScoreTrendForLastNDaysDocument = new TypedDocumentString(`
    query RecoveryScoreTrendForLastNDays($days: Int!) {
  recoveryScoreTrendForLastNDays(days: $days) {
    assessmentId
    day
    score
    previousScore
    scoreChange
    trend
    createdAt
  }
}
    `);
export const TodayMissionDocument = new TypedDocumentString(`
    query TodayMission($journeyId: ID!, $day: Int!) {
  todayMission(journeyId: $journeyId, day: $day) {
    id
    journeyId
    day
    title
    description
    overview
    reminder
    category
    difficulty
    impact
    time
    createdAt
    updatedAt
  }
}
    `);
export const TodayQuestionDocument = new TypedDocumentString(`
    query TodayQuestion {
  todayQuestion {
    id
    journeyId
    missionId
    day
    status
    askedAt
    answeredAt
    createdAt
    updatedAt
    conversation {
      role
      content
      question
      reflection
      insight
      createdAt
    }
  }
}
    `);
export const RegisterDeviceDocument = new TypedDocumentString(`
    mutation RegisterDevice($input: DeviceInfoInput!) {
  registerDevice(input: $input)
}
    `);
export const GetRecoveryFeelingDocument = new TypedDocumentString(`
    query GetRecoveryFeeling {
  getRecoveryFeeling
}
    `);
export const GetRecoveryGoalDocument = new TypedDocumentString(`
    query GetRecoveryGoal {
  getRecoveryGoal
}
    `);
export const GetRecoveryReasonDocument = new TypedDocumentString(`
    query GetRecoveryReason {
  getRecoveryReason
}
    `);
export const GetRecoveryTimelineDocument = new TypedDocumentString(`
    query GetRecoveryTimeline {
  getRecoveryTimeline
}
    `);

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CompleteJourney: build.mutation<CompleteJourneyMutation, CompleteJourneyMutationVariables | void>({
      query: (variables) => ({ document: CompleteJourneyDocument as unknown as string, variables })
    }),
    FollowUp: build.mutation<FollowUpMutation, FollowUpMutationVariables>({
      query: (variables) => ({ document: FollowUpDocument as unknown as string, variables })
    }),
    Logout: build.mutation<LogoutMutation, LogoutMutationVariables | void>({
      query: (variables) => ({ document: LogoutDocument as unknown as string, variables })
    }),
    LogoutAll: build.mutation<LogoutAllMutation, LogoutAllMutationVariables | void>({
      query: (variables) => ({ document: LogoutAllDocument as unknown as string, variables })
    }),
    PauseJourney: build.mutation<PauseJourneyMutation, PauseJourneyMutationVariables | void>({
      query: (variables) => ({ document: PauseJourneyDocument as unknown as string, variables })
    }),
    RefreshToken: build.mutation<RefreshTokenMutation, RefreshTokenMutationVariables>({
      query: (variables) => ({ document: RefreshTokenDocument as unknown as string, variables })
    }),
    RequestChangePasswordOtp: build.mutation<RequestChangePasswordOtpMutation, RequestChangePasswordOtpMutationVariables | void>({
      query: (variables) => ({ document: RequestChangePasswordOtpDocument as unknown as string, variables })
    }),
    ResumeJourney: build.mutation<ResumeJourneyMutation, ResumeJourneyMutationVariables | void>({
      query: (variables) => ({ document: ResumeJourneyDocument as unknown as string, variables })
    }),
    StartJourney: build.mutation<StartJourneyMutation, StartJourneyMutationVariables>({
      query: (variables) => ({ document: StartJourneyDocument as unknown as string, variables })
    }),
    UpdateProfile: build.mutation<UpdateProfileMutation, UpdateProfileMutationVariables>({
      query: (variables) => ({ document: UpdateProfileDocument as unknown as string, variables })
    }),
    VerifyChangePasswordOtp: build.mutation<VerifyChangePasswordOtpMutation, VerifyChangePasswordOtpMutationVariables>({
      query: (variables) => ({ document: VerifyChangePasswordOtpDocument as unknown as string, variables })
    }),
    GoogleLogin: build.mutation<GoogleLoginMutation, GoogleLoginMutationVariables>({
      query: (variables) => ({ document: GoogleLoginDocument as unknown as string, variables })
    }),
    GoogleRegister: build.mutation<GoogleRegisterMutation, GoogleRegisterMutationVariables>({
      query: (variables) => ({ document: GoogleRegisterDocument as unknown as string, variables })
    }),
    Login: build.mutation<LoginMutation, LoginMutationVariables>({
      query: (variables) => ({ document: LoginDocument as unknown as string, variables })
    }),
    Register: build.mutation<RegisterMutation, RegisterMutationVariables>({
      query: (variables) => ({ document: RegisterDocument as unknown as string, variables })
    }),
    ResendEmailVerificationOtp: build.mutation<ResendEmailVerificationOtpMutation, ResendEmailVerificationOtpMutationVariables>({
      query: (variables) => ({ document: ResendEmailVerificationOtpDocument as unknown as string, variables })
    }),
    VerifyEmailOtp: build.mutation<VerifyEmailOtpMutation, VerifyEmailOtpMutationVariables>({
      query: (variables) => ({ document: VerifyEmailOtpDocument as unknown as string, variables })
    }),
    ActiveJourney: build.query<ActiveJourneyQuery, ActiveJourneyQueryVariables | void>({
      query: (variables) => ({ document: ActiveJourneyDocument as unknown as string, variables })
    }),
    ApplicationConfig: build.query<ApplicationConfigQuery, ApplicationConfigQueryVariables | void>({
      query: (variables) => ({ document: ApplicationConfigDocument as unknown as string, variables })
    }),
    Me: build.query<MeQuery, MeQueryVariables | void>({
      query: (variables) => ({ document: MeDocument as unknown as string, variables })
    }),
    MotivationalMessage: build.query<MotivationalMessageQuery, MotivationalMessageQueryVariables | void>({
      query: (variables) => ({ document: MotivationalMessageDocument as unknown as string, variables })
    }),
    MyRecovery: build.query<MyRecoveryQuery, MyRecoveryQueryVariables | void>({
      query: (variables) => ({ document: MyRecoveryDocument as unknown as string, variables })
    }),
    RecoveryAssessmentHistory: build.query<RecoveryAssessmentHistoryQuery, RecoveryAssessmentHistoryQueryVariables | void>({
      query: (variables) => ({ document: RecoveryAssessmentHistoryDocument as unknown as string, variables })
    }),
    RecoveryScoreTrendForLastNDays: build.query<RecoveryScoreTrendForLastNDaysQuery, RecoveryScoreTrendForLastNDaysQueryVariables>({
      query: (variables) => ({ document: RecoveryScoreTrendForLastNDaysDocument as unknown as string, variables })
    }),
    TodayMission: build.query<TodayMissionQuery, TodayMissionQueryVariables>({
      query: (variables) => ({ document: TodayMissionDocument as unknown as string, variables })
    }),
    TodayQuestion: build.query<TodayQuestionQuery, TodayQuestionQueryVariables | void>({
      query: (variables) => ({ document: TodayQuestionDocument as unknown as string, variables })
    }),
    RegisterDevice: build.mutation<RegisterDeviceMutation, RegisterDeviceMutationVariables>({
      query: (variables) => ({ document: RegisterDeviceDocument as unknown as string, variables })
    }),
    GetRecoveryFeeling: build.query<GetRecoveryFeelingQuery, GetRecoveryFeelingQueryVariables | void>({
      query: (variables) => ({ document: GetRecoveryFeelingDocument as unknown as string, variables })
    }),
    GetRecoveryGoal: build.query<GetRecoveryGoalQuery, GetRecoveryGoalQueryVariables | void>({
      query: (variables) => ({ document: GetRecoveryGoalDocument as unknown as string, variables })
    }),
    GetRecoveryReason: build.query<GetRecoveryReasonQuery, GetRecoveryReasonQueryVariables | void>({
      query: (variables) => ({ document: GetRecoveryReasonDocument as unknown as string, variables })
    }),
    GetRecoveryTimeline: build.query<GetRecoveryTimelineQuery, GetRecoveryTimelineQueryVariables | void>({
      query: (variables) => ({ document: GetRecoveryTimelineDocument as unknown as string, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCompleteJourneyMutation, useFollowUpMutation, useLogoutMutation, useLogoutAllMutation, usePauseJourneyMutation, useRefreshTokenMutation, useRequestChangePasswordOtpMutation, useResumeJourneyMutation, useStartJourneyMutation, useUpdateProfileMutation, useVerifyChangePasswordOtpMutation, useGoogleLoginMutation, useGoogleRegisterMutation, useLoginMutation, useRegisterMutation, useResendEmailVerificationOtpMutation, useVerifyEmailOtpMutation, useActiveJourneyQuery, useLazyActiveJourneyQuery, useApplicationConfigQuery, useLazyApplicationConfigQuery, useMeQuery, useLazyMeQuery, useMotivationalMessageQuery, useLazyMotivationalMessageQuery, useMyRecoveryQuery, useLazyMyRecoveryQuery, useRecoveryAssessmentHistoryQuery, useLazyRecoveryAssessmentHistoryQuery, useRecoveryScoreTrendForLastNDaysQuery, useLazyRecoveryScoreTrendForLastNDaysQuery, useTodayMissionQuery, useLazyTodayMissionQuery, useTodayQuestionQuery, useLazyTodayQuestionQuery, useRegisterDeviceMutation, useGetRecoveryFeelingQuery, useLazyGetRecoveryFeelingQuery, useGetRecoveryGoalQuery, useLazyGetRecoveryGoalQuery, useGetRecoveryReasonQuery, useLazyGetRecoveryReasonQuery, useGetRecoveryTimelineQuery, useLazyGetRecoveryTimelineQuery } = injectedRtkApi;


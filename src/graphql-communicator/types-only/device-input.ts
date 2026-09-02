import { gql } from '@apollo/client';

export const REGISTER_DEVICE_MUTATION = gql`
  mutation RegisterDevice($input: DeviceInfoInput!) {
    registerDevice(input: $input)
  }
`;

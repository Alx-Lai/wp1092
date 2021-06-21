import { gql } from "@apollo/client";

export const SUBSCRIPTION = gql`
  subscription ($name: String!) {
    message(name: $name) {
      sender
      body
    }
  }
`;

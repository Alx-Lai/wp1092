import { gql } from "@apollo/client";

export const QUERY = gql`
  query ($name: String!) {
    messages(name: $name) {
      sender
      body
    }
  }
`;

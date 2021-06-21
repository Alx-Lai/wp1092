import { gql } from "@apollo/client";

export const MUTATION = gql`
  mutation sendMessage($name: String!, $sender: String!, $body: String!) {
    sendMessage(data: { name: $name, sender: $sender, body: $body }) {
      sender
    }
  }
`;

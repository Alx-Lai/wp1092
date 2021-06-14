import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
  query chatboxes(
    $name: String!
  ){
    chatboxes(
      name : $name
    ){
      id,
      name,
      messages{
        sender{
          name
        },
        body
      }
    }
  }
`;
/*
 mutation createChatBox(
    $name1: String!
    $name2: String!
  ) {
    createChatBox(
        name1: $name1
        name2: $name2
    ) {
      messages{
        sender{
          name
        }
        body
      }
    }
  }
*/
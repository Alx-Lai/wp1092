import { gql } from '@apollo/client';

export const CHATBOX_SUBSCRIPTION = gql`
  subscription chatBox (
    $name: String! 
  ){
    chatBox(
      name: $name
    ) 
    {
      id,
      sender{
        name
      },
      body
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

  subscription {
    post {
      mutation
      data {
        title
        body
        author {
          name
        }
        published
      }
    }
  }
*/
import { gql } from '@apollo/client';

export const CREATE_PROJECT_MUTATION = gql`
mutation createProject($name: String!, $content: String!) {
    createProject(name: $name, content: $content){
      name
      content
      users{
        name
        contact
        intro
      }
    }
}
`;
export const ADD_User_MUTATION = gql`
mutation addUser($projectName: String!, $username: String!) {
    addUser(projectName:$projectName username:$username){
      name
      content
      users{
        name
        contact
        intro
      }
    }
}
`;
export const REMOVE_PROJECT_MUTATION = gql`
mutation removeProject($name:String!) {
    removeProject(name:$name)
}
`;
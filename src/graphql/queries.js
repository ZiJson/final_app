import { gql } from '@apollo/client';

export const PROJECT_QUERY = gql`
query Project($name: String!){
    Project(name:$name){
        name
        content
        users{
          name
          contact
          intro
        }
      }
}
`
export const MY_PROJECT_QUERY = gql`
query MyProject($name: String!){
    MyProject(name:$name){
        name
        content
        users{
          name
          contact
          intro
        }
      }
}
`
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
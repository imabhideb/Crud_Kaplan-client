import { useQuery, gql } from '@apollo/client';

const GET_BUGS = gql`
  query {
    getBugs {
      id
      bug_name
      bug_status
    }
  }
`;


export const useFetchBug = () => {

    const {data, loading, refetch, error} = useQuery(GET_BUGS)
  
  
    return {
    refetch,
    loading,
    data,
    error
  }
}

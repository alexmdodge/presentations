import gql from 'graphql-tag';
import { getCars, getCarsFromDynamo } from '../graphql/queries';

const queries = {
  getCars: gql(getCars),
  getCarsFromDynamo: gql(getCarsFromDynamo),
};

export default queries;
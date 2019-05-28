import gql from 'graphql-tag';
import { getCars, getCarsFromDynamo } from '../graphql/queries';

const queries = {
  getCars: gql(getCars),
  getCarsWithLessAttributes: gql`
      query GetCars {
        getCars {
          vin
          make
      }
    }
  `
  getCarsFromDynamo: gql(getCarsFromDynamo),
};

export default queries;
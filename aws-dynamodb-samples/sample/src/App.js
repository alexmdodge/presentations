import React from 'react';
import './App.css';

import AWSAppSyncClient from 'aws-appsync';
import env from './aws-exports';
import { ApolloProvider, Query } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';

import queries from './services/queries'

const client = new AWSAppSyncClient({
  url: env.aws_appsync_graphqlEndpoint,
  region: env.aws_appsync_region,
  auth: {
    type: env.aws_appsync_authenticationType,
    apiKey: env.aws_appsync_apiKey,
  }
});

const App = () => {
  const renderCars = ({ loading, error, data }) => {
    if (loading) {
      return <div>Loading . . .</div>
    } else if (error) {
      console.error(error)
      return <div> Error retrieving data! </div>
    }

    console.log('Data is: ', data)

    return (
      <div className="card-list">
        {data.getCars.map((car, index) => {
          return (
            <div className="card blue-grey darken-1" key={index}>
              <div className="card-content white-text">
                <span className="card-title">Car {index + 1}</span>
                <div>Model - {car.model}</div>
                <div>Make - {car.make}</div>
                <div>Vin - {car.vin}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <Query query={queries.getCars} fetchPolicy="cache-and-network">
          {renderCars}
        </Query>
      </Rehydrated>
    </ApolloProvider>
  );
}

export default App;

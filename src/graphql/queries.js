/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCalc = /* GraphQL */ `
  query GetCalc($session: String!, $createdAt: AWSDateTime!) {
    getCalc(session: $session, createdAt: $createdAt) {
      id
      value
      createdAt
      session
      updatedAt
    }
  }
`;
export const listCalcs = /* GraphQL */ `
  query ListCalcs(
    $session: String
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelCalcFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCalcs(
      session: $session
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        value
        createdAt
        session
        updatedAt
      }
      nextToken
    }
  }
`;

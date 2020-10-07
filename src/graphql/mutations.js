/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCalc = /* GraphQL */ `
  mutation CreateCalc(
    $input: CreateCalcInput!
    $condition: ModelCalcConditionInput
  ) {
    createCalc(input: $input, condition: $condition) {
      id
      value
      createdAt
      session
      updatedAt
    }
  }
`;
export const updateCalc = /* GraphQL */ `
  mutation UpdateCalc(
    $input: UpdateCalcInput!
    $condition: ModelCalcConditionInput
  ) {
    updateCalc(input: $input, condition: $condition) {
      id
      value
      createdAt
      session
      updatedAt
    }
  }
`;
export const deleteCalc = /* GraphQL */ `
  mutation DeleteCalc(
    $input: DeleteCalcInput!
    $condition: ModelCalcConditionInput
  ) {
    deleteCalc(input: $input, condition: $condition) {
      id
      value
      createdAt
      session
      updatedAt
    }
  }
`;

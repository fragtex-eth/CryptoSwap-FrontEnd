import { gql } from "@apollo/client";

const GET_ACTIVE_ITEM = gql`
  {
    swaps(where: { amountOut_not: "0" }, first: 8) {
      id
      buyer
      tokenIn
      amountIn
      amountOut
    }
  }
`;
export default GET_ACTIVE_ITEM;

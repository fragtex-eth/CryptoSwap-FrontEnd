import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import DeployedContract from "../../../constants/networkMapping.json";
import "./transactionList.scss";
import GET_ACTIVE_ITEM from "../../../constants/subgraphQueries";

function TransactionList() {
  const AddressToken1 = "0xd87ba7a50b2e7e660f678a895e4b72e7cb4ccd9c"; //USDC
  const contractAddress = DeployedContract[5].CPAMM[0];
  let usdcimg =
    "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389";
  let chainlingimg =
    "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700";

  const { loading, error, data } = useQuery(GET_ACTIVE_ITEM);
  const [amount, setAmount] = useState(8);

  window.addEventListener("resize", updateWindowDimensions);

  function updateWindowDimensions() {
    if (window.innerHeight > 900) {
      setAmount(8);
    } else if (window.innerHeight <= 900 && window.innerHeight > 800) {
      setAmount(8);
    } else if (window.innerHeight <= 800 && window.innerHeight > 700) {
      setAmount(6);
    } else if (window.innerHeight <= 700 && window.innerHeight > 620) {
      setAmount(5);
    } else if (window.innerHeight <= 620 && window.innerHeight > 570) {
      setAmount(4);
    } else if (window.innerHeight <= 570 && window.innerHeight > 500) {
      setAmount(3);
    } else if (window.innerHeight <= 500 && window.innerHeight > 460) {
      setAmount(2);
    } else {
      setAmount(1);
    }
  }

  return (
    <div className="transaction-list">
      <h1 className="transaction-list-title">Transactions</h1>
      <div className="transaction-list-transactions">
        <div className="transaction-list-transactions-table">
          <div className="transaction-list-transactions-table-row">From</div>
          <div className="transaction-list-transactions-table-row">To</div>
          <div className="transaction-list-transactions-table-row">
            Currency
          </div>

          <div className="transaction-list-transactions-table-row">Amount</div>
          <div className="transaction-list-transactions-table-row">Price</div>
          <div className="transaction-list-transactions-table-row">
            Buy/Sell
          </div>
        </div>
        {!loading &&
          !error &&
          data.swaps.slice(0, amount).map((transaction) => {
            return (
              <div
                className="transaction-list-transactions-table"
                key={transaction.id}
              >
                <div className="transaction-list-transactions-table-row">
                  {transaction.buyer.slice(0, 5) +
                    "..." +
                    transaction.buyer.slice(
                      transaction.buyer.length - 3,
                      transaction.buyer.length + 1,
                    )}
                </div>
                <div className="transaction-list-transactions-table-row">
                  {contractAddress.slice(0, 5) +
                    "..." +
                    contractAddress.slice(
                      contractAddress.length - 3,
                      contractAddress.length + 1,
                    )}
                </div>
                <div className="transaction-list-transactions-table-row">
                  {transaction.tokenIn === AddressToken1
                    ? (
                      <>
                        <img
                          src={usdcimg}
                          alt="transaction-list-transactions-table-row-logo"
                        >
                        </img>
                        <p>USDC</p>
                      </>
                    )
                    : (
                      <>
                        <img
                          src={chainlingimg}
                          alt="transaction-list-transactions-table-row-logo"
                        >
                        </img>
                        <p>LINK</p>
                      </>
                    )}
                </div>
                <div className="transaction-list-transactions-table-row">
                  {transaction.tokenIn === AddressToken1
                    ? (
                      transaction.amountOut.toString() / 1000000000000000000
                    ).toFixed(0)
                    : (transaction.amountOut.toString() / 1000000).toFixed(0)}
                </div>
                <div className="transaction-list-transactions-table-row">
                  {transaction.tokenIn === AddressToken1
                    ? (
                      transaction.amountOut.toString() /
                      1000000000000000000(
                        transaction.amountIn.toString() / 1000000,
                      )
                    ).toFixed(2)
                    : (
                      transaction.amountOut.toString() /
                      1000000 /
                      (transaction.amountIn.toString() / 1000000000000000000)
                    ).toFixed(2)}
                </div>
                <div className="transaction-list-transactions-table-row">
                  Buy
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TransactionList;

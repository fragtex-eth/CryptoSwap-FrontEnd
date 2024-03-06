import React, { useState } from "react";
import { TbRefresh } from "react-icons/tb";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import DeployedContract from "../../../constants/networkMapping.json";
import ContractInterface from "../../../constants/SwapContract.json";
import ERCInterface from "../../../constants/ERCMapping.json";
import { useAccount } from "wagmi";
import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import "./swap.scss";
import { ethers } from "ethers";

const contractAddress = DeployedContract[5].CPAMM[0];
const contractABI = ContractInterface.abi;
const ercABI = ERCInterface.abi;
const AddressToken1 = "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C"; //USDC
const AddressToken2 = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; //Chainlink

let usdcimg =
  "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389";
let chainlingimg =
  "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700";

export default function Swap() {
  const [image1, setImage1] = useState(usdcimg);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [transaction, setTransaction] = useState(0);

  const GetPrice = async () => {
    const config = await prepareWriteContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "reserve0",
    });
    const config1 = await prepareWriteContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "reserve1",
    });
    let data = await readContract(config);
    let data1 = await readContract(config1);
    let priceUSDC = data.toString() / 1000000;
    let priceChainlink = data1.toString() / 1000000000000000000;
    setPrice((priceChainlink / priceUSDC).toFixed(2));
  };

  const ApproveTokens = async () => {
    let activeAddress = image1 === usdcimg ? AddressToken1 : AddressToken2;
    const config = await prepareWriteContract({
      address: activeAddress,
      abi: ercABI,
      functionName: "approve",
      args: [
        contractAddress,
        ethers.utils.parseUnits(amount.toString(), 18)._hex,
      ],
    });
    const data = await writeContract(config);
    setLoading(true);
    setTransaction(1);
    await waitForTransaction({
      hash: data.hash,
    });
    setLoading(false);
    setTransaction(2);
  };
  const ExchangeTokens = async () => {
    let activeAddress = image1 === usdcimg ? AddressToken1 : AddressToken2;
    const config = await prepareWriteContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "swap",
      overrides: {
        gasPrice: 300000000000,
      },
      args: [
        activeAddress,
        image1 === usdcimg
          ? ethers.utils.parseUnits(amount.toString(), 6)._hex
          : ethers.utils.parseUnits(amount.toString(), 18)._hex,
      ],
    });
    const data = await writeContract(config);
    setLoadingBuy(true);
    setTransaction(3);
    await waitForTransaction({
      hash: data.hash,
    });
    setLoadingBuy(false);
    setTransaction(0);
    setAmount(0);
    GetPrice();
  };

  const handleChange = async (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="swap">
      <div className="swap-top">
        <h1 className="swap-top-title">Exchange</h1>
        <TbRefresh
          className="swap-top-exchange"
          onClick={() =>
            image1 === usdcimg ? setImage1(chainlingimg) : setImage1(usdcimg)}
        />
      </div>
      {/* //TODO: move to single component */}
      {image1 === usdcimg
        ? (
          <div className="swap-rate">
            <div className="swap-rate-value">
              1<div className="swap-rate-value-symbol">&nbsp;USDC</div>
            </div>
            <IoIosArrowRoundForward className="swap-rate-arrow" />
            <div className="swap-rate-value">
              {price === 0 ? "" : price}{" "}
              <div className="swap-rate-value-symbol">&nbsp;LINK</div>
            </div>
          </div>
        )
        : (
          <div className="swap-rate">
            <div className="swap-rate-value">
              1<div className="swap-rate-value-symbol">&nbsp;LINK</div>
            </div>
            <IoIosArrowRoundForward className="swap-rate-arrow" />
            <div className="swap-rate-value">
              {(1 / price).toFixed(2)}
              <div className="swap-rate-value-symbol">&nbsp;USDC</div>
            </div>
          </div>
        )}
      <div className="swap-amount">
        Pay
        <div className="swap-amount-container">
          <input
            min="0"
            type="number"
            className="swap-amount-container-input"
            value={amount}
            onChange={(e) => handleChange(e)}
          />
          <button className="swap-amount-container-select">
            <img src={image1} alt="tokenimg"></img>
          </button>
        </div>
        <div className="swap-amount">Get</div>
        <div className="swap-amount-container ">
          <input
            min="0"
            type="number"
            className="swap-amount-container-input"
            value={image1 === usdcimg
              ? (amount * price).toFixed(2)
              : (amount / price).toFixed(2)}
            disabled={true}
          />
          <button className="swap-amount-container-select">
            <img
              alt="token"
              src={image1 === usdcimg ? chainlingimg : usdcimg}
            >
            </img>
          </button>
        </div>
        <div className="swap-submit">
          <button
            className="swap-submit-btn"
            onClick={() => ApproveTokens()}
            disabled={transaction !== 0 ? true : false}
          >
            <div className="swap-submit-btn-loader" hidden={!loading}></div>
            <p>Approve to use your {image1 === usdcimg ? " USDC" : " LINK"}</p>
          </button>
          <button
            className="swap-submit-btn"
            onClick={() => ExchangeTokens()}
            disabled={transaction !== 2 ? true : false}
          >
            <div className="swap-submit-btn-loader" hidden={!loadingBuy}></div>
            <p>Swap</p>
          </button>
        </div>
      </div>
    </div>
  );
}

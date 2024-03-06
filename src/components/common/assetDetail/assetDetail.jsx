import React from "react";
import "./assetDetail.scss";
import { VscTriangleUp } from "react-icons/vsc";
import posImg from "../../../assets/positivebg.png";
import negImg from "../../../assets/negbg.png";

function AssetDetail({ name, image, price, priceChange }) {
  const changeIsPositive = priceChange > 0;
  return (
    <div className="asset-details">
      {changeIsPositive
        ? <img src={posImg} className="asset-details-background" alt="gain" />
        : <img src={negImg} className="asset-details-background" alt="loss" />}
      <div className="asset-details-content">
        <div className="asset-details-content-top">
          <img src={image} alt="" className="asset-details-content-top-img" />
          <span className="asset-details-content-top-name">{name} (24h)</span>
          <div className="asset-details-content-top-price-change">
            <VscTriangleUp
              className={changeIsPositive
                ? "asset-details-content-top-price-change--positive --positive-color"
                : "asset-details-content-top-price-change--negative --negative-color"}
            />
            <span
              className={changeIsPositive
                ? "asset-details-content-top-price-change-text --positive-color"
                : "asset-details-content-top-price-change-text --negative-color"}
            >
              {((priceChange / price) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="asset-details-content-price">
          <span className="asset-details-content-price-symbol">$</span>
          {price}
        </div>
        <span
          className="asset-details-content-contribution"
          href="https://www.coingecko.com/"
        >
          Data by coingecko.com
        </span>
      </div>
    </div>
  );
}

export default AssetDetail;

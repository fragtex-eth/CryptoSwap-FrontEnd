import React, { useCallback, useState } from "react";
import "./header.scss";
import { debounce } from "../../../utils/debounce";
import { BsSearch } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import allcoins from "../../../allcoins.json";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CustomConnectBtn } from "../../common/rainbowkit/connectButton";
function Header({ setSearch, displaySearch }) {
  function findCoinsAndSetSearch(inputValue) {
    let inputstrg = inputValue.toLowerCase();
    let outputarray = [];
    let targetcoins = allcoins.filter(function(n) {
      return n.name.toLowerCase().startsWith(inputstrg);
    });

    for (var i in targetcoins) outputarray.push(targetcoins[i].id);
    if (inputValue === "") outputarray = "";
    setSearch(outputarray);
  }
  const debouncedFindCoinsAndSetSearch = useCallback(
    debounce(findCoinsAndSetSearch, 1000),
    [],
  );

  const handleInputChange = (e) => {
    debouncedFindCoinsAndSetSearch(e.target.value);
  };

  return (
    <div className="header">
      {displaySearch && (
        <div className="header-input-container">
          <BsSearch style={{ color: "#A6A9B3", fontSize: "1.25rem" }} />
          <input
            type="search"
            placeholder="Search Market"
            className="header-input-container-search"
            onChange={(e) => {
              handleInputChange(e);
            }}
          ></input>
        </div>
      )}
      <RiNotification3Line
        className="header-notification"
        style={{
          color: "#A6A9B3",
          fontSize: "24px",
          background: "#151823 !important",
          zIndex: "2",
        }}
      />
      <CustomConnectBtn
        className="header-connect"
        showBalance={{
          smallScreen: false,
          largeScreen: false,
        }}
        accountStatus="address"
        chainStatus="none"
      />
    </div>
  );
}

export default Header;

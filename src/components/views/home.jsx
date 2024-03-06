import "./home.scss";
import { useEffect, useState } from "react";
import Sidebar from "../layout/sidebar/sidebar";
import Header from "../layout/header/header";
import AssetList from "../layout/assetList/assetList";
import Swap from "../layout/swap/swap";
import TransactionList from "../layout/transactionList/transactionList";
import NftList from "../layout/nftList/nftList";
import console from "console-browserify";
export default function Home() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //screen size of item area
  const screenSize = screenWidth / 16 - 30;
  const maxNumberOfItems = Math.floor(screenSize / 18);
  const displayItems = maxNumberOfItems > 0;
  console.log(maxNumberOfItems);
  return (
    <div className="home">
      {displayItems && <Sidebar />}
      <main>
        <Header setSearch={setSearch} displaySearch={displayItems} />
        <div className="home-content">
          {displayItems && (
            <div className="home-content-left">
              <AssetList search={search} maxNumberOfItems={maxNumberOfItems} />
              <NftList maxNumberOfItems={maxNumberOfItems} />
            </div>
          )}
          <Swap />
        </div>
        <TransactionList />
      </main>
    </div>
  );
}

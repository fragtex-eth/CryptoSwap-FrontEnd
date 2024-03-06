import "./nftList.scss";
import NftDetail from "../../common/nftDetail/nftDetail";
import Beeple from "../../../assets/beeble1.mp4";
import Mad from "../../../assets/mad.mp4";
import Starbucks from "../../../assets/starbucks.mp4";
import Peace from "../../../assets/peace.mp4";

export default function NftList({ maxNumberOfItems }) {
  let nftData = [
    {
      video: Beeple,
      name: "Politics Is Bullshit",
      collectionName: "The First Drop",
    },
    {
      video: Mad,
      name: "Mad #7",
      collectionName: "CRAZIES",
    },
    {
      video: Starbucks,
      name: "The Holiday Cup Stamp",
      collectionName: "Starbucks",
    },
    {
      video: Peace,
      name: "Peace",
      collectionName: "Euphoria",
    },
  ];

  return (
    <div className="nft-list">
      <h1>Top NFTs</h1>
      <div className="nft-list-collection">
        {nftData.slice(0, maxNumberOfItems).map((nft) => (
          <NftDetail
            img={nft.video}
            name={nft.name}
            collectionName={nft.collectionName}
          />
        ))}
      </div>
    </div>
  );
}

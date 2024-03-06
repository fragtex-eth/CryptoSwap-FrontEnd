import "./nftDetail.scss";
export default function NftDetail({ img, name, collectionName }) {
  return (
    <div className="nft-detail">
      <video
        src={img}
        alt={name}
        className="nft-detail-video"
        onMouseOver={(event) => event.target.play()}
        onMouseOut={(event) => event.target.pause()}
        loop
        muted
      />
      <div className="nft-detail-text">
        <span className="nft-detail-collectionName">{collectionName}</span>
        <span className="nft-detail-name">{name}</span>
      </div>
    </div>
  );
}

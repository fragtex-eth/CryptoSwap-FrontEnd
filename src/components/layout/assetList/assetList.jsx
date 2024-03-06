import "./assetList.scss";
import AssetDetail from "../../common/assetDetail/assetDetail";
import console from "console-browserify";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AssetList({ search, maxNumberOfItems }) {
  const [jsonData, setJsonData] = useState([]);
  const [fetchedData, setFetchedData] = useState({});
  const [cancelTokenSource, setCancelTokenSource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Cancel any ongoing requests before making new ones
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Request canceled due to search change");
      }

      const newCancelTokenSource = axios.CancelToken.source();
      setCancelTokenSource(newCancelTokenSource);

      let firstXItems = search;
      if (search === "") {
        firstXItems = ["bitcoin", "ethereum", "cardano", "aave"];
      }
      firstXItems.slice(0, maxNumberOfItems);
      const promises = firstXItems.map(async (id) => {
        // Check if data is already fetched for the current ID
        if (fetchedData[id]) {
          return fetchedData[id];
        }

        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}`,
            {
              cancelToken: newCancelTokenSource.token, // Attach cancel token to the request
            },
          );
          const result = response.data;

          // Update local state with the fetched data
          setFetchedData((prevData) => ({
            ...prevData,
            [id]: result,
          }));

          return result;
        } catch (error) {
          // If request is canceled, ignore the error
          if (axios.isCancel(error)) {
            console.log(`Request canceled for ID ${id}`);
          } else {
            console.error(`Error fetching data for ID ${id}:`, error);
          }
          return null;
        }
      });

      try {
        const results = await Promise.all(promises);
        setJsonData(results.filter((result) => result !== null));
      } catch (error) {
        console.error("Error in Promise.all:", error);
      }
    };

    fetchData();
    console.log(jsonData);
    // Cleanup function to cancel the ongoing requests when component unmounts or when search changes
    return () => {
      if (cancelTokenSource) {
        console.log("Cancelling ongoing requests");
        cancelTokenSource.cancel("Request canceled due to component unmount");
      }
    };
  }, [search]);

  return (
    <div className="asset-list">
      {jsonData.slice(0, maxNumberOfItems).map((coin) => (
        <AssetDetail
          name={coin.name}
          image={coin.image.small}
          price={coin.market_data.current_price.usd}
          priceChange={coin.market_data.price_change_24h}
        />
      ))}
    </div>
  );
}

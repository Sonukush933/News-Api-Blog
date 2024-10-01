import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";

const NewsList = ({ news, fetchFunction, totalResults, loading }) => {
  return (
    <div className="news-list-container">
      <InfiniteScroll
        dataLength={news.length} // Number of loaded articles
        next={fetchFunction} // Fetch next set of articles
        hasMore={news.length < totalResults} // Check if there are more articles to load
        loader={
          loading ? <h4 style={{ color: "seagreen" }}>Loading...</h4> : null
        } // Show loader while loading next set
        endMessage={
          <p style={{ textAlign: "center", color: "seagreen" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {news.map((data) => (
          data.title && data.author && data.description && (
            <NewsItem
              key={data.url || data.publishedAt} // Use a unique key (url or publishedAt)
              news={data}
            />
          )
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default NewsList;

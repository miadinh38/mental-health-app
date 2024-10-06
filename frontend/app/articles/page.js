"use client";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SearchBar from "../../components/SearchBar";
import ArticlesList from "../../components/ArticlesList";
import useInsertArticles from "../../hooks/useInsertAriticles";

const Articles = () => {
  const [searchInput, setSearchInput] = useState("");
  const { allArticles, loading } = useInsertArticles();

  const handleSearchButton = () => {
    console.log("Clicked Search");
  };

  return (
    <div className="max-container padding-container">
      <p className="flexCenter bold-32 my-5 p-5">Articles & News</p>

      {/* Search */}
      <SearchBar
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        onClickSearch={handleSearchButton}
      />

      {/* Render all articles */}
      {loading ? (
        <div className="h-lvh">
          <Skeleton />
        </div>
      ) : (
        <ArticlesList allArticles={allArticles} />
      )}
    </div>
  );
};
export default Articles;

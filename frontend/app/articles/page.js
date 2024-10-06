"use client";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SearchBar from "../../components/SearchBar";
import ArticlesList from "../../components/ArticlesList";
import useInsertArticles from "../../hooks/useInsertAriticles";
import { searchedArticlesService } from "../services/articlesService.js";

const Articles = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedArticles, setSearchedArticles] = useState([]);
  const { allArticles, loading } = useInsertArticles();

  const handleSearchButton = async () => {
    if (!searchInput) return;
    try {
      const response = await searchedArticlesService(searchInput);

      if (response.data && response.data.message) {
        setSearchedArticles([]);
      }

      setSearchedArticles(response.data);
      setSearchInput("");
    } catch (error) {
      console.error("Error fetching searched articles:", error);
    }
  };

  return (
    <div className="max-container padding-container">
      <p className="flexCenter bold-32 my-5 p-5">Articles & News</p>

      <div className="flex flexCenter gap-4 m-10">
        <button
          type="button"
          onClick={() => setSearchedArticles([])}
          className="btn_dark_green rounded-xl "
        >
          ALL
        </button>

        {/* Search */}
        <SearchBar
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          onClickSearch={handleSearchButton}
        />
      </div>

      {/* Render all or searched articles */}
      {loading ? (
        <div className="h-lvh">
          <Skeleton />
        </div>
      ) : searchedArticles.length > 0 ? (
        <ArticlesList allArticles={searchedArticles} />
      ) : allArticles.length > 0 ? (
        <ArticlesList allArticles={allArticles} />
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};
export default Articles;

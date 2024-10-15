"use client";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SearchBar from "../../components/SearchBar";
import ArticlesList from "../../components/cards/ArticlesList";
import {
  insertArticlesService,
  searchedArticlesService,
  fetchAllArticlesService,
} from "../services/articlesService.js";
import Pagination from "../../components/Pagination";

const Articles = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [length, setLength] = useState(0);

  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const limit = 10;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        if (searchInput) {
          const response = await searchedArticlesService(
            searchInput,
            currentPage,
            limit
          );
          setSearchedArticles(response.data.paginatedArticles);
          setLength(response.data.totalCount);
        } else {
          if(length === 0) {
            // Insert articles to db
            await insertArticlesService();
          }
          
          // Fetch articles with pagination
          const res = await fetchAllArticlesService(currentPage, limit);
          setAllArticles(res.data.articles);
          setLength(res.data.totalCount);
        }
      } catch (error) {
        console.error("Error during articles check or insertion:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, length]);

  const handleSearchButton = async () => {
    if (!searchInput) return;
    setCurrentPage(1);

    try {
      const response = await searchedArticlesService(searchInput, 1, limit);

      if (response.data && response.data.message) {
        setSearchedArticles([]);
        setLength(0);
      }

      setAllArticles([]);
      setSearchedArticles(response.data.paginatedArticles);
      setLength(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching searched articles:", error);
    }
  };

  const handlePagination = async (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAllButton = async () => {
    setSearchedArticles([]);
    setSearchInput("");
    setCurrentPage(1);

    // Check if all articles are already loaded
    if (allArticles.length > 0) {
      return;
    }

    setLoading(true);
    await insertArticlesService();

    // Fetch articles with pagination
    const res = await fetchAllArticlesService(1, limit);
    setAllArticles(res.data.articles);
    setLength(res.data.totalCount);
    setLoading(false);
  };

  return (
    <div className="max-container padding-container">
      <p className="flexCenter bold-32 my-5 p-5">Articles & News</p>

      <div className="flex flexCenter my-10 gap-4 xs:gap-1.5 px-5">
        <button
          type="button"
          onClick={handleAllButton}
          className="btn_dark_green rounded-xl xs:px-3 xs:text-sm xs:rounded-md"
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

      {length > 0 && (
        <Pagination
          length={length}
          articlesPerPage={limit}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />
      )}

      {/* Render all or searched articles */}
      {loading ? (
        <div className="h-lvh">
          <Skeleton />
        </div>
      ) : searchedArticles?.length > 0 ? (
        <ArticlesList allArticles={searchedArticles} />
      ) : allArticles?.length > 0 ? (
        <ArticlesList allArticles={allArticles} />
      ) : (
        <p className="flex justify-center h-lvh">No articles found.</p>
      )}
    </div>
  );
};
export default Articles;

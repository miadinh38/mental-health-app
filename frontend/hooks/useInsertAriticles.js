import { useEffect, useState } from "react";
import {
  checkArticlesExist,
  fetchAllArticlesService,
  insertArticlesService,
} from "../app/services/articlesService.js";

const useInsertArticles = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const insertAndFetchArticles = async () => {
      try {
        // Check if the articles have already been inserted
        const response = await checkArticlesExist();
        const articlesExist = response.data.hasArticles;

        if (!articlesExist) {
          await insertArticlesService();
        }

        // Fetch articles after insertion (or if they already exist)
        const res = await fetchAllArticlesService();
        setAllArticles(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error during articles check or insertion:", error);
      }
    };

    insertAndFetchArticles();
  }, []);

  return { allArticles, loading };

};

export default useInsertArticles;

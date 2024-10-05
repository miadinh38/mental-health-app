"use client";
import { useEffect, useState } from "react";
import { fetchAllArticlesService } from "../services/articlesService";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Articles = () => {
  const [allArticles, setAllArticles] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetchAllArticlesService();
        setAllArticles(res.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="max-container padding-container">
      <p className="flexCenter bold-32 my-5 p-5">
        Articles & News
      </p>

      <motion.div className="flex flex-wrap justify-center gap-16">
        {allArticles.map((article) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            key={`${article.id}`}
            className="shadow-sm w-80 px-4 py-6 rounded-md bg-gray-100 hover:cursor-pointer hover:shadow-xl"
          >
            <Image
              src={`${article.url_to_image}`}
              alt={`${article.title}`}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto rounded-sm"
              priority
            />
            <div className="flex">
              <p className="regular-14 my-3 capitalize text-gray-20">
                {article.source_name} • {formatDate(article.published_at)}{" "}
              </p>
            </div>
            <p className="bold-16 capitalize mb-4">{article.title}</p>
            <div class="border-t border-gray-300 my-2 w-1/4"></div>
            <p className="regular-14 text-gray-30 mb-6">{article.description}</p>
            <Link
              href={`${article.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-50 bg-green-50 px-2 py-2 text-white regular-14 rounded-md hover:bg-black"
            >
              Read More
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
export default Articles;

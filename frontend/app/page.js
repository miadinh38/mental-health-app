"use client";
import Feedback from "../components/homepage/Feedback";
import Header from "../components/homepage/Header";
import Information from "../components/homepage/Information";
import JoinCommunity from "../components/homepage/JoinCommunity";
import LastPage from "../components/homepage/LastPage";
import Values from "../components/homepage/Values";
import Values2 from "../components/homepage/Values2";

export default function HomePage() {
  return (
    <>
      <Header />
      <Values />
      <Values2 />
      <JoinCommunity />
      <Feedback />
      <Information />
      <LastPage />
    </>
  );
}

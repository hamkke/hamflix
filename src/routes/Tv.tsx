import { useQuery } from "@tanstack/react-query";
import { onceGetTv } from "api";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "utils";
import { useMatch, useNavigate } from "react-router-dom";

import Slider from "components/Slider";

const Banner = styled.div<{ bgPhoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 60px;
  height: 75vh;
  background-image: linear-gradient(
      #ffffff49,
      ${(props) => props.theme.bgColor}
    ),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const MovieTitle = styled.h2`
  font-size: 60px;
`;
const Overview = styled.p`
  font-size: 25px;
  width: 35%;
  position: relative;
  margin: 20px 0 150px;
`;
const SliderWrap = styled.div`
  width: 100%;
  /* padding: 0px 50px; */
  /* position: absolute; */
  /* bottom: -200px; */
  /* display: flex; */
  /* flex-direction: column; */
  height: 10vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const Tv = () => {
  const { data, isLoading } = useQuery(["tv"], onceGetTv);
  return (
    <div>
      {isLoading ? (
        "LOADING"
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(data?.topRated_tv[0].backdrop_path || "")}
          >
            <MovieTitle>{data?.topRated_tv[0].name}</MovieTitle>
            <Overview>
              {data?.topRated_tv[0].overview.substring(0, 100) + "..."}
            </Overview>
          </Banner>
          <SliderWrap>
            <Slider
              data={data?.topRated_tv.slice(1)}
              slideTitle="최고 등급의 TV 프로그램 "
            />
            <Slider
              data={data?.airingToday_tv}
              slideTitle="오늘 방송되는 TV 프로그램"
            />
            <Slider
              data={data?.popular_tv}
              slideTitle="현재 인기 있는 TV 프로그램"
            />
          </SliderWrap>
        </>
      )}
    </div>
  );
};

export default Tv;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { onceGetMovies } from "api";
import { makeImagePath } from "utils";
import styled from "styled-components";
import Slider from "components/Slider";

const Wrap = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
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

// ///////////////////////////////////////////////////////////////////////////////////////////////////
const Home = () => {
  const { data, isLoading } = useQuery(["movies"], onceGetMovies);

  return (
    <Wrap>
      {isLoading ? (
        <Loader>✨LOADING✨</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(data?.topRated_movie[0].backdrop_path || "")}
          >
            <MovieTitle>{data?.topRated_movie[0].title}</MovieTitle>
            <Overview>
              {data?.topRated_movie[0].overview.substring(0, 100) + "..."}
            </Overview>
          </Banner>
          <SliderWrap>
            <Slider
              data={data?.topRated_movie.slice(1)}
              slideTitle="평점 높은 영화"
            />
            <Slider data={data?.playing_movie} slideTitle="현재 상영 영화" />
            <Slider data={data?.upComing_movie} slideTitle="개봉 예정 영화" />
          </SliderWrap>
        </>
      )}
    </Wrap>
  );
};

export default Home;

import { useState } from "react";
import { useMatch, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { IMovie, ITv, IResult } from "api";
import { makeImagePath } from "utils";
import MovieDetail from "components/MovieDetail";
import TvDetail from "components/TvDetail";
import styled from "styled-components";

const SlideTitle = styled.h2`
  font-size: 30px;
  margin: 20px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
`;
const Box = styled(motion.div)`
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
    margin-left: -10px;
  }
  &:last-child {
    transform-origin: center right;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const RowWrap = styled.div`
  position: relative;
  height: 20vh;
`;
const Info = styled(motion.div)`
  width: 100%;
  padding: 15px;
  background-color: ${(props) => props.theme.GREEN};
  color: ${(props) => props.theme.bgColor};
  text-align: center;
  opacity: 0;
`;
const DirectionBtn = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100%;
  z-index: 10;
  opacity: 1;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
const PrevBtn = styled(DirectionBtn)`
  left: 0px;
  background: linear-gradient(
    to right,
    ${(props) => props.theme.bgColor} 45%,
    rgba(255, 255, 255, 0) 100%
  );
`;
const NextBtn = styled(DirectionBtn)`
  right: 0px;
  background: linear-gradient(
    to left,
    ${(props) => props.theme.bgColor} 30%,
    rgba(255, 255, 255, 0) 100%
  );
`;
const ArrowRight = styled.svg`
  width: 50px;
  height: 50px;
  fill: ${(props) => props.theme.variousColor};
`;
const ArrowLeft = styled(ArrowRight)`
  transform: rotateY(180deg);
`;
const rowVariants = {
  hidden: (isPrev: boolean) => ({
    x: isPrev ? window.innerWidth : -window.innerWidth,
  }),
  visible: { x: 0 },
  exit: (isPrev: number) => ({
    x: isPrev ? -window.innerWidth : window.innerWidth,
  }),
};
const boxVariants = {
  normal: { scale: 1 },
  hover: {
    zIndex: 100,
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      type: "tween",
    },
  },
};
const offset = 6;

interface IProps {
  data?: IMovie[] | ITv[];
  slideTitle: string;
}
const Slider = ({ data, slideTitle }: IProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const bigTvMatch = useMatch("/tv/:tvId");

  const [contentId, setContentId] = useState(0);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isPrev, setPrev] = useState(false);
  const handleIndex = (direction: string) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      // 왜 -1? 첫 번째 index는 메인 화면에 있기 때문에
      // const totalMovies = data.results.length - 1;
      const totalMovies = 18;

      const maxIndex = Math.floor(totalMovies / offset) - 1;
      if (direction === "next") {
        setPrev(false);
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else if (direction === "prev") {
        setPrev(true);
        setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      }
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const whichBoxClicked = (contentId: number) => {
    setContentId(contentId);
    if (location.pathname === "/tv") {
      navigate(`/tv/${contentId}`);
    } else {
      navigate(`/movies/${contentId}`);
    }
  };
  return (
    <>
      <SlideTitle>{slideTitle}</SlideTitle>
      <RowWrap>
        <PrevBtn>
          <ArrowLeft
            onClick={() => handleIndex("prev")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 600"
          >
            <path d="m253.75 0-87.5 87.5 192.5 192.5-192.5 192.5 87.5 87.5 280-280z" />
          </ArrowLeft>
        </PrevBtn>
        <NextBtn>
          <ArrowRight
            onClick={() => handleIndex("next")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 600"
          >
            <path d="m253.75 0-87.5 87.5 192.5 192.5-192.5 192.5 87.5 87.5 280-280z" />
          </ArrowRight>
        </NextBtn>
        <AnimatePresence
          custom={isPrev}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <Row
            custom={isPrev}
            key={index}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={rowVariants}
            transition={{ type: "tween", duration: 1.5 }}
          >
            {data
              ?.slice(offset * index, offset * index + offset)
              .map((item) => (
                <Box
                  layoutId={String(item.id)}
                  onClick={() => whichBoxClicked(item.id)}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  key={item.id}
                >
                  <img
                    src={makeImagePath(item.backdrop_path || item.poster_path)}
                    alt={"title" in item ? item.title : item.name}
                  />
                  <Info variants={infoVariants}>
                    {"title" in item ? item.title : item.name}
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </RowWrap>
      <AnimatePresence>
        {(bigMovieMatch && (
          <MovieDetail contentId={contentId} type="movie" />
        )) ||
          (bigTvMatch && <TvDetail contentId={contentId} type="tv" />)}
      </AnimatePresence>
    </>
  );
};

export default Slider;

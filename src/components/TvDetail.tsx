import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetail, IGetMovieDetail, IGetTvDetail } from "api";
import { makeImagePath } from "utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3333339c;
  opacity: 0;
  padding: 10px;
  z-index: 100;
`;
const DetailCard = styled(motion.div)`
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
  margin: auto;
  width: 40vw;
  min-width: 700px;
  height: 60vh;
  z-index: 100;
`;
const BackImgBox = styled.div<{ bgPhoto: string }>`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  width: 100%;
  height: 60%;
  background-image: linear-gradient(
      #ffffff49,
      ${(props) => props.theme.bgColor}
    ),
    url(${(props) => props.bgPhoto});
  background-size: cover;

  & div {
    display: flex;
    flex-direction: column;
    width: 65%;
    font-weight: bold;
    & h2 {
      margin-bottom: 10px;
      font-size: 30px;
    }

    & h3 {
      font-size: 20px;
    }
  }
`;

const DescBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 40%;
  background-color: ${(props) => props.theme.bgColor};
  & div {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 65%;
    & ul {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      & li {
        position: relative;
        margin-right: 10px;
        &::after {
          position: absolute;
          right: -7px;
          content: "・";
        }

        &:last-child::after {
          display: none;
        }
      }
    }

    & p {
      margin-top: 10px;
      width: 85%;
    }
  }
`;
const PosterBox = styled.div<{ bgPhoto: string }>`
  position: absolute;
  left: 40px;
  bottom: 60px;
  width: 160px;
  height: 250px;
  background: url(${(props) => props.bgPhoto}) no-repeat;
  background-size: contain;
`;
interface IProps {
  contentId: number;
  type: string;
}

const MovieDetail = ({ contentId, type }: IProps) => {
  const { data } = useQuery<IGetTvDetail>(["movie", "detail"], () =>
    getMovieDetail(contentId, type)
  );

  const navigate = useNavigate();
  const location = useLocation();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const bigTvMatch = useMatch("/tv/:tvId");
  const onOverlayCliked = () => {
    bigMovieMatch ? navigate("/") : navigate("/tv");
  };
  console.log(data);
  return (
    <>
      <AnimatePresence>
        {bigTvMatch && (
          <>
            <Overlay
              onClick={onOverlayCliked}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DetailCard layoutId={bigTvMatch.params.tvId}>
                <PosterBox bgPhoto={makeImagePath(data?.poster_path || "")} />
                <BackImgBox bgPhoto={makeImagePath(data?.backdrop_path || "")}>
                  <div>
                    <h2>{data?.name}</h2>
                    <h3>{data?.original_name}</h3>
                  </div>
                </BackImgBox>
                <DescBox>
                  <div>
                    {/* <ul>
                      {data?.genres.map((a) => (
                        <li key={a.id}>{a.name || ""}</li>
                      ))}
                    </ul> */}
                    <ul>
                      <li>{data?.first_air_date.split("-").slice(0, 1)}년</li>
                      {/* <li>{data?.runtime}분</li> */}
                      <li>{data?.vote_average.toFixed(1)}점</li>
                    </ul>
                    <p>{data?.overview.slice(0, 100)}...</p>
                  </div>
                </DescBox>
              </DetailCard>
            </Overlay>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MovieDetail;

import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { ISearchResults, getSearchResults } from "api";
import { useLocation } from "react-router-dom";
import { makeImagePath } from "utils";
const Title = styled.h2`
  margin-top: 150px;
  font-size: 40px;
`;
const Wrap = styled.ul`
  padding: 10px;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;
const List = styled.li<{ bgPhoto: string }>`
  background: url(${(props) => props.bgPhoto});
  background-size: cover;
  position: relative;
`;

const ResultsTitle = styled.h3`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.variousColor};
  color: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Search = () => {
  const location = useLocation();
  console.log(location.pathname.split("/")[2]);
  const { data } = useQuery<ISearchResults>(["search"], () =>
    getSearchResults(location.pathname.split("/")[2])
  );

  return (
    <>
      <Title>검색 결과</Title>
      <Wrap>
        {data?.results.map((a) => (
          <List bgPhoto={makeImagePath(a.backdrop_path || "")} key={a.id}>
            <ResultsTitle>{a.name || a.title}</ResultsTitle>
          </List>
        ))}
      </Wrap>
    </>
  );
};

export default Search;

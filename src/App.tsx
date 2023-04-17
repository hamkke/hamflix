import { useRecoilValue } from "recoil";
import { toggleTheme } from "atom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "components/Header";
import Home from "routes/Home";
import Tv from "routes/Tv";
import Search from "routes/Search";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "GlobalStyle";
import { darkTheme, lightTheme } from "./theme";

const App = () => {
  const isDark = useRecoilValue(toggleTheme);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="movies/:MovieId" />
          </Route>
          <Route path="tv" element={<Tv />}>
            <Route path=":tvId" />
          </Route>
          <Route path="search" element={<Search />}>
            <Route path=":keyword" />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

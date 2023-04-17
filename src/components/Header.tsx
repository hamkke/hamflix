import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toggleTheme } from "atom";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  motion,
  useAnimation,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  border-bottom: 1px solid ${(props) => props.theme.GREEN};
  z-index: 10;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 30px;
  width: 45px;
  height: 45px;
  fill: ${(props) => props.theme.PINK};
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 20px;
  color: ${(props) => props.theme.variousColor};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.variousColor};
  }
  a {
    margin: 7px;
    font-size: 20px;
    font-weight: bold;
  }
`;

const IndicateRect = styled(motion.span)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid ${(props) => props.theme.PINK};
`;

const Search = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.variousColor};
  svg {
    position: absolute;
    right: 0;
    height: 25px;
  }
`;
const Input = styled(motion.input)`
  background-color: transparent;
  transform-origin: right center;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.variousColor};
  padding: 5px 30px 5px 10px;
`;
const ThemeBtn = styled.button`
  margin-left: 10px;
  padding: 2px 7px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.PINK};
  color: ${(props) => props.theme.variousColor};
  font-size: 20px;
`;
const logoVariants = {
  normal: { stroke: "#FF3C82", strokeWidth: 5 },
  active: {
    fill: ["#28C87B", "#FF3C82", "#28C87B"],
    transition: {
      repeat: Infinity,
    },
  },
};
interface IForm {
  keyword: string;
}
const Header = () => {
  const isDark = useRecoilValue(toggleTheme);
  const setToggleTheme = useSetRecoilState(toggleTheme);
  const handleToggleTheme = () => setToggleTheme((prev) => !prev);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const isMatchHome = useMatch("/");
  const isMatchTv = useMatch("tv");
  const navigate = useNavigate();
  const inputAni = useAnimation();
  const navAni = useAnimation();
  const { scrollY } = useScroll();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: any) => {
    navigate(`/search/${data.keyword}`);
  };

  const searchOpen = () => {
    if (isSearchOpen) {
      inputAni.start({
        scaleX: 0,
      });
    } else {
      inputAni.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };
  useEffect(() => {
    if (window.scrollY > 80) {
    }
  });
  useMotionValueEvent(scrollY, "change", (a) => {
    if (a >= 100) {
      navAni.start({
        backgroundColor: "#28c878",
      });
    } else {
      navAni.start({
        backgroundColor: "#28C8780",
      });
    }
  });
  return (
    <Nav
      initial={{
        backgroundColor: "#28c8780",
        borderBottom: "1px solid #FF3C82",
      }}
      animate={navAni}
    >
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="active"
          initial="normal"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 66 90"
        >
          <motion.path d="M50.1 37.2L50.1 0.899994L65.3 0.899994L65.3 89.3L50.1 89.3L50.1 49.8L15.9 49.8L15.9 89.3L0.700001 89.3L0.700001 0.899994L15.9 0.899994L15.9 37.2L50.1 37.2Z" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">
              HOME {isMatchHome && <IndicateRect layoutId="indicator" />}
            </Link>
          </Item>
          <Item>
            <Link to="tv">
              Tv SHOW {isMatchTv ? <IndicateRect layoutId="indicator" /> : null}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <motion.svg
            onClick={searchOpen}
            animate={{
              rotateZ: isSearchOpen ? "90deg" : 0,
            }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              // fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              // clipRule="evenodd"
            ></path>
          </motion.svg>
          <form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("keyword", { required: "빈칸 안돼" })}
              initial={{ scaleX: 0 }}
              animate={inputAni}
              transition={{ type: "linear" }}
              placeholder="검색어를 입력해주세요"
            />
          </form>
        </Search>
        <ThemeBtn onClick={handleToggleTheme}>click</ThemeBtn>
      </Col>
    </Nav>
  );
};

export default Header;

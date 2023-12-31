import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import Icon from "../components/Icon";
import logo from "../assets/logo.svg";

const Nav = styled.nav`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #084153;
  color: white;
  padding: 0rem 1rem;
  position: sticky;
  top: 0;
`;
//   padding: 1rem 2rem;
//   background-color: #333;
const NatTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: #fff;
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li``;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Navigation = () => {
  return (
    <>
      <Nav>
        <Link to="/">
          <Icon src={logo} alt="App Logo" />
        </Link>
        <NatTitle>Note app</NatTitle>
        <NavList>
          <NavItem>
            <StyledLink to="/">Home</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/create">Create Note</StyledLink>
          </NavItem>
        </NavList>
      </Nav>
      <Outlet />
    </>
  );
};

export default Navigation;

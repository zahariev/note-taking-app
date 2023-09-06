import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #333;
  padding: 1rem 2rem;
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

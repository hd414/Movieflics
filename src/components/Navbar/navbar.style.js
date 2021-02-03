import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';


export const Group = styled.div`
  display: flex;
  align-items: center;
`;

export const Link = styled.p`
  color: #fff;
  text-decoration: none;
  margin-right: 30px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
  &:last-of-type {
    margin-right: 0;
  }
`;

export const Picture = styled.button`
background: url(${({ src }) => src});
background-repeat:no-repeat;
background-size: cover;
border: 0;
width: 32px;
height: 32px;
cursor: pointer;
`;

export const Dropdown = styled.div`
display: none;
position: fixed;
background-color: black;
padding: 10px;
width: 200px;
top: 3em;
right: 10px;
${Group}:last-of-type ${Link} {
  cursor: pointer;
}
${Group} {
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 0;
  }
  ${Link} {
    cursor: pointer;
  }
  ${Picture} {
    cursor: default;
  }
}
button {
  margin-right: 10px;
}
p {
  font-size: 12px;
  margin-bottom: 0;
  margin-top: 0;
}
`;

export const Profile = styled.div`
display: flex;
align-items: center;
margin-left: 20px;
position: relative;
button {
  cursor: pointer;
}
&:hover > ${Dropdown} {
  display: flex;
  flex-direction: column;
}
`;


export const SearchInput = styled.input`
  background-color: rgba(64, 64, 64, 0.5);
  color: white;
  border: 1px solid white;
  transition: width 0.5s;
  height: 30px;
  font-size: 14px;
  border-radius: 4px;
  margin-left: ${({ active }) => (active === true ? '10px' : '0')};
  padding: ${({ active }) => (active === true ? '0 10px' : '0')};
  opacity: ${({ active }) => (active === true ? '1' : '0')};
  width: ${({ active }) => (active === true ? '200px' : '0px')};
  &:focus {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  position:fixed;
  right:6rem;
  svg {
    color: white;
    cursor: pointer;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

export const SearchIcon = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;
  outline: 0;
  height: 32px;
  width: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    filter: brightness(0) invert(1);
    width: 16px;
  }
`;
import styled from "styled-components";

export const FileContainer = styled.div`
  width: 100%;

  // border: 1px solid blue;
`;

export const ContentArea = styled.div.attrs({
  // contentEditable: true,
})`
  width: 100%;
  height: 500px;
  margin-top: 20px;

  border-radius: 5px;

  border: 1px solid gray;
`;

export const DeleteButton = styled.button`
  width: 20px;
  height: 20px;

  border: 1px solid green;
`;

export const CustomLink = styled.a`
  color: gray;
`;

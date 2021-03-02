import styled from "styled-components";

export const FileContainer = styled.div`
  width: 100%;

  border: 1px solid blue;
`;

export const Title = styled.div`
    width: 100%;
    height; 20px;
    
    color: red;
    
    border: 1px solid green;
`;

export const ContentArea = styled.div.attrs({
  // contentEditable: true,
})`
  width: 100%;
  height: 500px;

  border: 1px solid blue;
`;

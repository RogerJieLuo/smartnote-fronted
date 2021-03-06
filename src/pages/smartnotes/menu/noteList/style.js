import styled from "styled-components";

export const NoteListContainer = styled.div`
  width: 100%;
  margin-top: 30px;

  // border: 1px solid green;
`;

export const AddButton = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 50px;
  font-size: 20px;

  border-radius: 5px;
  box-shadow: 1px 5px 5px 1px #bbbbbb;

  &:hover {
    box-shadow: 5px 1px 1px 5px #ababab;
  }
  // border: 1px solid green;
`;

export const NoteItem = styled.div`
  width: 100%;
  margin-top: 10px;
  text-align: center;
  font-size: 20px;

  border-radius: 5px;
  box-shadow: 1px 5px 5px 1px #aaaaaa;

  &:hover {
    box-shadow: 5px 1px 1px 5px #ababab;
  }
  // border: 1px solid red;
`;

export const SelectedItem = styled(NoteItem)`
  box-shadow: 5px 1px 1px 5px #bdbdbd;
`;

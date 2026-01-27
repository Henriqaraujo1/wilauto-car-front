import styled from "styled-components";
import Select from "react-select";
import { Colors } from "../../../variable";

export const DivGraphics = styled.div`
  width: 100%;
  margin-bottom: 5px;
  border: 1px solid black;
  border-radius: 25px;
`;
export const DivOrgTitleGraph = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TitleGraph = styled.h4`
  font-size: 1.2rem;
`;

export const DivGraph = styled.div`
  height: 230px;
  margin-top: 10px;
  padding: 5px;
`;

export const SelectOption = styled(Select)`
  text-align: center;
  width: 150px;
  height: 10px;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;

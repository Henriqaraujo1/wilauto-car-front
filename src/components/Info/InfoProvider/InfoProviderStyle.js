import styled from "styled-components";
import { Colors} from "../../../variable";

export const DivOrgProvider = styled.div`
  width: 100%;
  height: 110px;
  border: 1px solid black;
  border-radius: 25px;
  margin: 5px auto;
  display: flex;
  flex-direction: column;

  animation: grow 0.1s linear;
  @keyframes grow {
    0% {
      height: 10px;
    }
    50% {
      height: 30px;
    }
    100% {
      height: 60px;
    }
  }
`;

export const DivInfoProvider = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${Colors.BackgroundColors.BkCards.White};
  border-radius: 25px;
  flex-direction: column;
  animation: grow 0.2s linear;
  @keyframes grow {
    0% {
      height: 10px;
    }
    50% {
      height: 30px;
    }
    100% {
      height: 60px;
    }
  }
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  margin: 3px auto;
  display: flex;
  flex-direction: row;
  height: 20px;
`;
export const DivBtnClose = styled.div`
  width: 100%;
  /* height: 50%; */
  margin: 5px auto;
  padding-right: 10px;
  display: flex;
  justify-content: flex-end;
  align-content: center;
`;

export const BtnClose = styled.button`
  width: 5%;
  height: 100%;
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;

  &:active {
    transform: translateY(4px);
    /* box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton}; */
  }
`;

export const InfoProviderResult = styled.p`
  font-size: 0.8em;
`;

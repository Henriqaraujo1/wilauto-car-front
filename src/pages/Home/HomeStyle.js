import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";
import { Swiper, SwiperSlide } from "swiper/react";

export const DivHome = styled.div`
width: 1100px;
  /* height: 650px; */
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 5px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const TitleHome = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DivOrgSelect = styled.div`
  width: max-content;
  border: 1px solid black;
  margin: 5px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SelectMonth = styled.select`
  width: max-content;
  height: 100%;
  font-size: ${({ theme }) => theme.fontSize};
  color: ${Colors.Text.Black};
  margin: 3px;
  background-color: transparent;
  /* border: 1px solid black; */
  border-radius: 25px;
`;
export const OptionMonth = styled.option`
  text-align: center;
  background-color: transparent;
  border: 1px solid black;
`;

export const DivOrgBtnFilter = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const BtnSearch = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid black;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Search};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Search};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const BtnCancel = styled.button`
  width: 25px;
  border: 1px solid black;
  height: 25px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Canceled};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivSeparate = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivOrgHome = styled.div`
  width: 48%;
  height: 100%;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivOrgProfit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const DivOrgReport = styled(Swiper)`
  width: 100%;
  border: 1px solid red;
`;

export const ReportOne = styled(SwiperSlide)`
  background-position: center;
  background-size: cover;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid black;
  margin-bottom: 25px;
  /* width: 80px;
  height: 100px; */
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 25px;
  padding: 5px;
`;

export const DivOrgStatus = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media screen and (min-width: 320px) and (max-width: 932px) {
    height: 450px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-content: center;
  }
`;

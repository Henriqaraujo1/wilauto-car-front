import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export const DivRep = styled.div`
  width: 48%;
  height: 95%;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  padding: 10px;
  background-color: ${Colors.BackgroundColors.BkDiv};
  border: 1px solid ${Colors.Text.Black};
  box-sizing: border-box;
  border-radius: 25px;

  ${Phone_media.Phone_column}
`;

export const DivOrgTitle = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TitleStatusReport = styled.h1`
  font-size: 1.1rem;
`;

export const DivReport = styled(Swiper)`
  width: 100%;
  height: 100%;
  padding: 0 50px;
`;

export const ReportOne = styled(SwiperSlide)`
  background-position: center;
  background-size: cover;
  background: ${Colors.BackgroundColors.BkCards.Blue};
  border: 1px solid black;
  margin-top: 25px;
  width: 80px;
  height: 100px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 25px;
  padding: 5px;
`;

export const ReportTitle = styled.h6`
  font-size: ${({ theme }) => theme.fontSize};
  margin-bottom: 5px;
`;
export const ReportValue = styled.p`
  font-size: 30px;
`;

export const BtnMore = styled(Link)`
  padding: 5px;
  height: 25px;
  text-decoration: none;
  color: ${Colors.Text.Black};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  background-color: ${Colors.ButtonsColors.Actions};
  border: 1px solid ${Colors.Text.Black};
  box-sizing: border-box;
  border-radius: 25px;
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.ColorActive};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(3px);
  }
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

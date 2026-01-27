import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivOrgDetail = styled.div`
  width: 100%;
  height: 100%;
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TitleDetail = styled.h2``;

export const TableInvoice = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: center;

  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  ${Phone_media.Phone_table};
  ${Tablet_media.Tablet_table};
`;

export const InfoInvoiceDetails = styled.div`
  width: 100%;
  height: 100%;
  margin: 5px auto;
  padding: 10px;
  background: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
  ::-webkit-scrollbar {
    display: flex;
    width: 12px;
    @media screen and (min-width: 320px) and (max-width: 940px) {
      width: 6px;
    }
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.ButtonsColors.Actions};
  }

  @media screen and (min-width: 320px) and (max-width: 940px) {
    padding: 0px;
  }
`;

export const InvoiceDetail = styled.div`
  width: 100%;
  height: 50%;
  margin: 5px;
  background-color: ${Colors.Text.White};
  border: 1px solid black;
  border-radius: 25px;
`;

export const TitleIn = styled.h3`
  font-size: 1.2rem;
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  height: 85%;
  padding: 10px;

  overflow: auto;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: flex;
    width: 12px;
    @media screen and (min-width: 320px) and (max-width: 940px) {
      width: 6px;
    }
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.ButtonsColors.Actions};
  }

  @media screen and (min-width: 320px) and (max-width: 940px) {
    padding: 0px;
  }
`;

export const TableInfo = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* font-size: 18px; */
  text-align: center;
`;
export const HeaderInfo = styled.thead``;
export const RowInfo = styled.tr`
  border-bottom: 1px solid #dddddd;
  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;
export const NameInfo = styled.th`
  font-size: 0.8rem;
`;
export const BodyInfo = styled.tbody`
  border-bottom: 1px solid #dddddd;
`;
export const Item = styled.td`
  font-size: 0.8rem;
  text-align: center;
`;

export const Value = styled(Numeric)`
  font-size: 0.85rem;
`;

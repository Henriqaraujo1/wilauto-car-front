import styled from 'styled-components';
import { Colors, Phone_media, Tablet_media } from '../../variable';

export const DivFinishOrder = styled.div`
  width: 1100px;
  height: 700px;
  margin: 15px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;  
  align-items: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;
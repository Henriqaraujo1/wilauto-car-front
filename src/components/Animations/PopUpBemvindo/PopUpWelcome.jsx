import {
  BtnWelcome,
  CanvaIframe,
  CanvaWrapper,
  Footer,
  PopUp,
  WelcomeInfo,
} from "./PopUpWelcome.style";

export default function PopUpWelcome({
  infoPopupWelcome,
  setInfoPopupWelcome,
}) {
  return (
    <PopUp show={infoPopupWelcome}>
      <WelcomeInfo>
        <CanvaWrapper>
          <CanvaIframe
            loading="lazy"
            src="https://www.canva.com/design/DAG_62IxhTw/RpxHNmz99gZMGhGNyvtaHg/view?embed"
            allow="fullscreen"
            allowFullScreen
          />
        </CanvaWrapper>
        <Footer>
          <BtnWelcome type="button" onClick={() => setInfoPopupWelcome(true)}>
            Começar a usar o sistema
          </BtnWelcome>
        </Footer>
      </WelcomeInfo>
    </PopUp>
  );
}

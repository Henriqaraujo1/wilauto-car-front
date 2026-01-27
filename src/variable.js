// * - Este arquivo contém definições de mídia CSS para diferentes dispositivos, variáveis de cores e informações de tela do dispositivo.

// * -Definições de mídia para dispositivos móveis (telefone)
export const Phone_media = {
  Phone_column: [
    `@media screen and (max-width: 768px) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 10px;
        margin: 5px auto;
    }`,
  ],
  Phone_row: [
    `@media only screen and (min-width: 320px) and (max-width: 768px) {
        display: flex;
        justify-content: center;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }`,
  ],
  Phone_table: [
    `@media screen and (min-width: 320px) and (max-width: 768px) {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      margin: 10px 0px 0px;
      padding: 10px;
      width: 100%;
      height: 500px;
    }`,
  ],
  Phone_Form: [
    `@media screen and (min-width: 320px) and (max-width: 768px) {
      width: 100%;
      margin: 5px auto;

    }`,
  ],
  Phone_Pop_UP: [
    `@media screen and (min-width: 320px) and (max-width: 768px){
      width: 100%;
      height: 100%;
      top: 140px;
      left: 0px;
    }`,
  ],
};

// * - Definições de mídia para tablets
export const Tablet_media = {
  Tablet_row: [
    `@media screen and (min-width: 769px) and (max-width: 1024px){
        width: 90%;
        // height: 100%;
        // flex-direction: row;
        // padding: 10px;
    }`,
  ],
  Tablet_column: [
    `@media screen and (min-width: 769px) and (max-width: 1024px){
        width: 95%;
        padding: 10px;
    }`,
  ],
  Tablet_table: [
    `@media screen and (min-width: 769px) and (max-width: 1024px) {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      margin-top: 10px;
      padding: 10px;
      width: 100%;
      height: 500px;
    }`,
  ],
  Tablet_Form: [
    `@media screen and (min-width: 769px) and (max-width: 1024px) {
      width: 100%;
      margin: auto;
    }`,
  ],
  Tablet_Pop_Up: [
    `@media screen and (min-width: 769px) and (max-width: 1024px) {
      width: 120%;
      height: 100%;
      left: 20px;
    }`,
  ],
};

// * - Definições de mídia para PCs
export const PC_media = {
  PC_row: [`@media screen and (min-width: 1025px) and (max-width: 1540px)`],
  PC_column: [`@media screen and (min-width: 1025px) and (max-width: 1540px)`],
};


// * - Definições de cores utilizadas no design da página
export const Colors = {
  //  * - Cores para fundos de Div
  BackgroundColors: {
    BkDiv: "rgba(255, 255, 255, 0.5)", // * - Fundo das divs principais de org de outras paginas - pode trocar
    BkItem: "#fff",
    BkComponent: "#feac00", // * - Fundo de Div para forms e tabelas - pode trocar
    BKBlur: "rgba(121, 149, 255, 0.2)", // * Usado para fundo de pop-up de atualização
    BKGreenBlur: "rgba(75,181,67 , 0.5)",
    BkTable: "rgba(0, 0, 0, 0.6)",
    BkLogin: "rgba(0, 0, 0, 0.6)",
    BKBar: "#7995ff",
    // * - Cores para cards e items
    BkCards: {
      BkMoney: "rgba(182, 255, 170, 0.88)", // * - Fundo de div relacionado a ganhos - Trocar em caso de o fundo antes dessa ser verde
      BkCashier: "rgba(255, 242, 124, 0.88)", // * - Fundo de div relacionado a movimentações e conta- Trocar em caso de o fundo antes dessa ser amarelo
      BkExpense: "rgba(227,38,54, 0.88)", // * - Fundo de div relacionado a despesas e perdas - Trocar em caso de o fundo antes dessa ser vermelho
      BkStockOut: "rgba(255,69,74, 0.77)", // * - Fundo de div relacionado a saida de item do estoque - Trocar em caso de o fundo antes dessa ser vermelho
      BkStockNow: "rgb(160,215,245)", // * - Fundo de div relacionado a entrada de produto no estoque - Trocar em caso de o fundo antes dessa ser azul
      Blue: "rgba(73, 146, 255, 0.58)",
      Red: "rgba(255, 67, 67, 0.47)", 
      Gray: "#7c7c7c",
      
      Info: "#7995ff",
      White: "#FFFFFF",
    },
    BkInputs: {
      White: "#fff",
      Gray: "rgba(255, 255, 255, 0.8)",
    },
  },
  ColorsGraphs: {
    Lines: {
      BkMoney: "rgb(45,217,209)", // * - Cores do grafico para faturamento - Não trocar
      BkProfit: "rgba(182, 255, 170, 0.88)", // * - Cores do grafico para lucro - Não trocar
      BkCashier: "rgba(255, 242, 124, 0.88)",// * - Cores do grafico para o movimentos - Não trocar
      BkExpense: "rgba(227,38,54, 0.88)", // * - Cores do grafico para despesas - Não trocar
      BkStockOut: "rgba(255,69,74, 0.77)", // * - Cores do grafico para saida de produto do estoque - Não trocar
      BKStockOrders: "rgb(65, 105, 225)", // * - Cores do grafico para entrada de produto no estoque - Não trocar
      BkStockNow: "rgb(160,215,245)", // * - Cores do grafico para estoque atual - Não trocar
    },
    Points: {
      BkMoney: "rgb(45,217,209)",  // * - Cores do grafico para faturamento - Não trocar
      BkProfit: "rgba(182, 255, 170, 0.88)", // * - Cores do grafico para lucro - Não trocar
      BkCashier: "rgba(255, 242, 124, 0.88)", // * - Cores do grafico para o movimentos - Não trocar
      BkExpense: "rgba(227,38,54, 0.88)", // * - Cores do grafico para despesas - Não trocar
      BkStockOut: "rgba(255,69,74, 0.77)", // * - Cores do grafico para saida de produto do estoque - Não trocar
      BKStockOrders: "rgb(65, 105, 225)", // * - Cores do grafico para entrada de produto no estoque - Não trocar
      BkStockNow: "rgb(160,215,245)", // * - Cores do grafico para estoque atual - Não trocar
    },
  },

  // * - Cores usadas para botões, trocar só em caso de conflito de cores primaria
  ButtonsColors: {
    Confirm: "rgba(182, 255, 170, 0.88)",
    Canceled: "rgba(255, 0, 0, 0.6)",
    Search: "#fbff45",
    Ratings: "#d3af37",
    Faqs: "#ed9121",
    Details: "#fbff45",
    Password: "rgb(56, 161, 56)",
    Printer: "#F3D500",
    Change: "rgba(255, 0, 0, 0.6)",
    Actions: "#7995ff",
    ColorActive: "#7995ff",
    Invoice: "rgba(55, 132, 249, 0.88)",
    ShadowButton: "rgba(0,0,0, 0.3)",
    CloseButton: "rgba(223, 21, 21, 0.5)",
  },
  // * - Cores para textos
  Text: {
    Black: "#000",
    White: "#fff",
    Red: "#ff0000",
    Alert: "#faf493",
  },
};

export const getTheme = (fontSize) => ({
  fontSize: fontSize || "16px"
});

export var altura = window.screen.height;
export var largura = window.screen.width;

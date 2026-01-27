import React, { useEffect, useState } from "react";
import { Colors } from "../../../variable";
import { Chart, Line } from "react-chartjs-2";
import {
  DivGraph,
  DivGraphics,
  DivOrgTitleGraph,
  SelectOption,
  TitleGraph,
} from "./ProfitGraphicsStyle";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineController,
  BarController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

export default function ProfitGraphics(props) {
  const profitInfo = props.profitGraph;
  const profitGraphByDay = props.profitGraphByDay;
  const statusGraph = props.statusData;

  const [isClearable] = useState(true);

  const [displayGraphChartMonth, setDisplayGraphChartMonth] = useState("none");
  const [displayGraphLineMonth, setDisplayGraphLineMonth] = useState("flex");

  const [displayGraphChartDay, setDisplayGraphChartDay] = useState("none");
  const [displayGraphLineDay, setDisplayGraphLineDay] = useState("none");

  const [labels, setLabels] = useState([]);
  const [dataOrders, setDataOrders] = useState([]);
  const [dataExpense, setDataExpense] = useState([]);
  const [dataStock, setDataStock] = useState([]);
  const [dataProfit, setDataProfit] = useState([]);

  const infoMonths = [];
  const infoOrders = [];
  const infoExpenses = [];
  const infoStock = [];
  const infoProfit = [];

  const [labelsDay, setLabelsDay] = useState([]);
  const [dataOrdersDay, setDataOrdersDay] = useState([]);
  const [dataExpenseDay, setDataExpenseDay] = useState([]);
  const [dataStockDay, setDataStockDay] = useState([]);
  const [dataProfitDay, setDataProfitDay] = useState([]);

  const infoDay = [];
  const ordersDay = [];
  const expensesDay = [];
  const stockDay = [];
  const profitDay = [];

  const optionsGraphs = [
    { value: 1, label: "Linha Meses", display: "flex" },
    { value: 2, label: "Barra Meses", display: "flex" },
    { value: 3, label: "Linha Dias", display: "flex" },
    { value: 4, label: "Barra Dias", display: "flex" },
  ];

  useEffect(() => {
    if (profitInfo?.codeStatus === 200) {
      profitInfo?.profitGraph.forEach((orders) => {
        infoMonths.push(orders.nameMonth);
        infoOrders.push(orders.ordersMonth);
        infoExpenses.push(orders.expenseMonth);
        infoStock.push(orders.stockOrdersMonth);
        infoProfit.push(orders.totalProfit);
      });
      setLabels(infoMonths);
      setDataOrders(infoOrders);
      setDataExpense(infoExpenses);
      setDataStock(infoStock);
      setDataProfit(infoProfit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profitInfo]);

  useEffect(() => {
    if (profitGraphByDay?.codeStatus === 200) {
      profitGraphByDay?.profitGraph.forEach((orders) => {
        infoDay.push(orders.date);
        ordersDay.push(orders.ordersMonth);
        expensesDay.push(orders.expenseMonth);
        stockDay.push(orders.stockOrdersMonth);
        profitDay.push(orders.totalProfit);
      });
      setLabelsDay(infoDay);
      setDataOrdersDay(ordersDay);
      setDataExpenseDay(expensesDay);
      setDataStockDay(stockDay);
      setDataProfitDay(profitDay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profitGraphByDay]);

  useEffect(() => {
    if (statusGraph) {
      setLabels([]);
      setDataOrders([]);
      setDataExpense([]);
      setDataStock([]);
      setDataProfit([]);
      setLabelsDay([]);
      setDataOrdersDay([]);
      setDataExpenseDay([]);
      setDataStockDay([]);
      setDataProfitDay([]);
      infoDay.pop();
      ordersDay.pop();
      expensesDay.pop();
      stockDay.pop();
      profitDay.pop();
      infoDay.pop();
      ordersDay.pop();
      expensesDay.pop();
      stockDay.pop();
      profitDay.pop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGraph]);

  const changeGraph = (infoGraph) => {
    if (infoGraph?.value === 1) {
      setDisplayGraphLineMonth(infoGraph.display);
      setDisplayGraphChartMonth("none");
      setDisplayGraphLineDay("none");
      setDisplayGraphChartDay("none");
    }
    if (infoGraph?.value === 2) {
      setDisplayGraphChartMonth(infoGraph.display);
      setDisplayGraphLineMonth("none");
      setDisplayGraphLineDay("none");
      setDisplayGraphChartDay("none");
    }
    if (infoGraph?.value === 3) {
      setDisplayGraphLineDay(infoGraph.display);
      setDisplayGraphChartDay("none");
      setDisplayGraphChartMonth("none");
      setDisplayGraphLineMonth("none");
    }
    if (infoGraph?.value === 4) {
      setDisplayGraphChartDay(infoGraph.display);
      setDisplayGraphChartMonth("none");
      setDisplayGraphChartMonth("none");
      setDisplayGraphLineDay("none");
    }
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "left",
      },
      title: {
        display: false,
        text: "Dataset",
      },
    },
  };

  const dataLineMonth = {
    labels,
    datasets: [
      {
        label: "Faturado",
        data: dataOrders,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkMoney,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkMoney,
      },
      {
        label: "Despesas",
        data: dataExpense,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkExpense,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkExpense,
      },
      {
        label: "Compras p/ Estoque",
        data: dataStock,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BKStockOrders,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BKStockOrders,
      },
      {
        label: "Lucro",
        data: dataProfit,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkProfit,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkProfit,
      },
    ],
  };

  const dataBarMonth = {
    labels,
    datasets: [
      {
        type: "bar",
        borderWidth: 2,
        label: "Faturado",
        data: dataOrders,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkMoney,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkMoney,
      },
      {
        type: "bar",
        borderWidth: 2,
        label: "Despesas",
        data: dataExpense,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkExpense,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkExpense,
      },
      {
        type: "bar",
        borderWidth: 2,
        label: "Compras p/ Estoque",
        data: dataStock,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BKStockOrders,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BKStockOrders,
      },
      {
        type: "bar",
        borderWidth: 2,
        label: "Lucro",
        data: dataProfit,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkProfit,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkProfit,
      },
    ],
  };

  const dataLineDay = {
    labels: labelsDay,
    datasets: [
      {
        label: "Faturado",
        data: dataOrdersDay,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkMoney,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkMoney,
      },
      {
        label: "Despesas",
        data: dataExpenseDay,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkExpense,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkExpense,
      },
      {
        label: "Compras p/ Estoque",
        data: dataStockDay,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BKStockOrders,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BKStockOrders,
      },
      {
        label: "Lucro",
        data: dataProfitDay,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkProfit,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkProfit,
      },
    ],
  };

  const dataBarDay = {
    labels: labelsDay,
    datasets: [
      {
        type: "bar",
        borderWidth: 2,
        label: "Faturado",
        data: dataOrdersDay,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkMoney,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkMoney,
      },
      {
        type: "bar",
        borderWidth: 2,
        label: "Despesas",
        data: dataExpenseDay,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkExpense,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkExpense,
      },
      {
        type: "bar",
        borderWidth: 2,
        label: "Compras p/ Estoque",
        data: dataStockDay,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BKStockOrders,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BKStockOrders,
      },
      {
        type: "bar",
        borderWidth: 2,
        label: "Lucro",
        data: dataProfitDay,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkProfit,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkProfit,
      },
    ],
  };

  return (
    <DivGraphics>
      <DivOrgTitleGraph>
        <TitleGraph>Grafico de Vendas e Despesas</TitleGraph>
        <SelectOption
          name="permissions"
          placeholder="Selecione"
          isClearable={isClearable}
          options={optionsGraphs}
          onChange={changeGraph}
        />
      </DivOrgTitleGraph>
      <DivGraph>
        {/* <DivInfoGraph></DivInfoGraph> */}
        <Line
          options={options}
          data={dataLineMonth}
          height={100}
          width={500}
          style={{ display: displayGraphLineMonth }}
        />
        {/* <Pie data={data}/> */}
        <Chart
          type="bar"
          options={options}
          data={dataBarMonth}
          height={100}
          width={500}
          style={{ display: displayGraphChartMonth }}
        />
        <Line
          options={options}
          data={dataLineDay}
          height={100}
          width={500}
          style={{ display: displayGraphLineDay }}
        />
        {/* <Pie data={data}/> */}
        <Chart
          type="bar"
          options={options}
          data={dataBarDay}
          height={100}
          width={500}
          style={{ display: displayGraphChartDay }}
        />
      </DivGraph>
    </DivGraphics>
  );
}

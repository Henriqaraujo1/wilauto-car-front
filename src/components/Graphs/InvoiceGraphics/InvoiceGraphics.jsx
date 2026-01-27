import React, { useEffect, useState } from "react";
import { Colors } from "../../../variable";
import { Chart, Line } from "react-chartjs-2";
import {
  DivGraph,
  DivGraphics,
  DivOrgTitleGraph,
  SelectOption,
  TitleGraph,
} from "./InvoiceGraphicsStyle";
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

export default function InvoiceGraphics(props) {
  const ordersInfo = props.invoiceGraph;
  const statusGraph = props.statusData;

  const [isClearable] = useState(true);
  const [displayGraphChartMonth, setDisplayGraphChartMonth] = useState("none");
  const [displayGraphLineMonth, setDisplayGraphLineMonth] = useState("flex");
  const [displayGraphChartDay, setDisplayGraphChartDay] = useState("none");
  const [displayGraphLineDay, setDisplayGraphLineDay] = useState("none");

  const [labels, setLabels] = useState([]);
  const [dataOrders, setDataOrders] = useState([]);
  const [dataExpense, setDataExpense] = useState([]);
  const infoMonths = [];
  const infoValues = [];
  const infoExpenses = [];

  const [labelsDay, setLabelsDay] = useState([]);
  const [ordersDays, setOrdersDays] = useState([]);
  const [expenseDays, setExpenseDays] = useState([]);
  const infoDays = [];
  const infoTotalDays = [];
  const infoExpensesDay = [];

  const optionsGraphs = [
    { value: 1, label: "Linha Meses", display: "flex" },
    { value: 2, label: "Barra Meses", display: "flex" },
    { value: 3, label: "Linha Dias", display: "flex" },
    { value: 4, label: "Barra Dias", display: "flex" },
  ];

  useEffect(() => {
    if (ordersInfo?.codeStatus === 200) {
      ordersInfo?.invoiceGraph.forEach((orders) => {
        infoMonths.push(orders.nameMonth);
        infoValues.push(orders.orderValue);
        infoExpenses.push(orders.expenseValue);
      });
      setLabels(infoMonths);
      setDataOrders(infoValues);
      setDataExpense(infoExpenses);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersInfo]);

  useEffect(() => {
    if (ordersInfo?.codeStatus === 200) {
      ordersInfo?.invoiceByDay?.forEach((orders) => {
        infoDays.push(orders.date);
        infoTotalDays.push(orders.orderValue);
        infoExpensesDay.push(orders.expenseValue);
      });
      setLabelsDay(infoDays);
      setOrdersDays(infoTotalDays);
      setExpenseDays(infoExpensesDay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersInfo]);

  useEffect(() => {
    if (statusGraph) {
      setLabels([]);
      setDataExpense([]);
      setDataOrders([]);
      setOrdersDays([]);
      setExpenseDays([]);
      infoMonths.pop();
      infoValues.pop();
      infoExpenses.pop();
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
        label: "Vendas",
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
    ],
  };

  const dataBarMonth = {
    labels,
    datasets: [
      {
        type: "bar",
        borderWidth: 2,
        label: "Vendas",
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
    ],
  };

  const dataLineDays = {
    labels: labelsDay,
    datasets: [
      {
        label: "Vendas",
        data: ordersDays,
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
    ],
  };
  const dataBarDays = {
    labels: labelsDay,
    datasets: [
      {
        type: "bar",
        borderWidth: 2,
        label: "Vendas",
        data: ordersDays,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkMoney,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkMoney,
      },
      {
        type: "bar",
        borderWidth: 2,
        label: "Despesas",
        data: expenseDays,
        // Linha
        borderColor: Colors.ColorsGraphs.Lines.BkExpense,
        // Ponto
        backgroundColor: Colors.ColorsGraphs.Points.BkExpense,
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
          data={dataLineDays}
          height={100}
          width={500}
          style={{ display: displayGraphLineDay }}
        />
        <Chart
          type="bar"
          options={options}
          data={dataBarDays}
          height={100}
          width={500}
          style={{ display: displayGraphChartDay }}
        />
      </DivGraph>
    </DivGraphics>
  );
}

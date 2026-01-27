import { useState, useEffect } from "react";
import {
  DivResumeBudgets,
  TitleResumeBudgets,
  DivScreenBudgets,
} from "./Budgets.style";
import { useDispatch } from "react-redux";
import TableBudget from "../../components/Tables/TableBudget/TableBudget";
import { getAllBudgets } from "../../store/budget/budget.actions";
import { useGetAllClientsQuery } from "../../store/registers/clients/clients.api";

export default function ResumeBudgets() {
  const dispatch = useDispatch();
  const [listBudgets, setListBudgets] = useState(null);
  const [loadingBudgets, setLoadingBudgets] = useState(false);

  const { data: clients } = useGetAllClientsQuery();

  const getBudgets = async () => {
    const infoBudgets = await dispatch(getAllBudgets());
    setListBudgets(infoBudgets.payload);
  };

  useEffect(() => {
    getBudgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loadingBudgets) {
      getBudgets();
      setLoadingBudgets(false);
    }
  }, [loadingBudgets]);

  return (
    <DivResumeBudgets>
      <TitleResumeBudgets>Orçamentos</TitleResumeBudgets>
      <DivScreenBudgets>
        <TableBudget
          listBudgets={listBudgets?.budgets}
          setLoadingBudgets={setLoadingBudgets}
          listClient={clients?.client}
        />
      </DivScreenBudgets>
    </DivResumeBudgets>
  );
}

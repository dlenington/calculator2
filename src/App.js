import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { createCalculation } from "./graphql/mutations";
import { listCalculations } from "./graphql/queries";
import { onCreateCalculation } from "./graphql/subscriptions";

import awsExports from "./aws-exports";
import Calculator from "./components/calculator";
import CalculationList from "./components/calculationList";
import ListItemText from "@material-ui/core/ListItemText";

function App() {
  const [currentCalculation, setCurrentCalculation] = useState([]);
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    fetchCalculations();

    const subscription = API.graphql(
      graphqlOperation(onCreateCalculation)
    ).subscribe({
      next: (calculationData) => {
        console.log(calculations);
        // console.log(calculations.slice(8));
        setCalculations((prevState) => [
          calculationData.value.data.onCreateCalculation,
          ...prevState,
        ]);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  async function addCalculation() {
    try {
      if (currentCalculation.length == 0) return;
      const data = { value: currentCalculation.join(" ").trim() };
      await API.graphql(graphqlOperation(createCalculation, { input: data }));
    } catch (err) {
      console.log("error creating calculation:", err);
    }
  }

  const fetchCalculations = async () => {
    try {
      const calculationData = await API.graphql(
        graphqlOperation(listCalculations, { limit: 10 })
      );
      const calculations = calculationData.data.listCalculations.items;
      setCalculations(calculations);
    } catch (err) {
      console.log("error fetching calculation", err);
    }
  };

  return (
    //  <AppBar></AppBar>
    //title
    <div style={{ width: "1000px" }}>
      <div style={{ flex: 0.5 }}>
        <Calculator
          onAddCalculation={addCalculation}
          setCurrentCalculation={setCurrentCalculation}
          currentCalculation={currentCalculation}
        />
      </div>
      <div style={{ flex: 0.5 }}>
        {/* <CalculationList calculations={calculations} /> */}
        <List>
          {calculations.map((calculation) => (
            <ListItem>
              <ListItemText primary={calculation.value} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

export default App;

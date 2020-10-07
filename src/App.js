import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import { createCalc } from "./graphql/mutations";
import { listCalcs } from "./graphql/queries";
import { onCreateCalc } from "./graphql/subscriptions";

import Calculator from "./components/calculator";
import CalculationList from "./components/calculationList";
import NavBar from "./components/navBar";

function App() {
  const [currentCalculation, setCurrentCalculation] = useState([]);
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    fetchCalculations();

    const subscription = API.graphql(graphqlOperation(onCreateCalc)).subscribe({
      next: (calculationData) => {
        console.log(calculations);
        setCalculations((prevState) => [
          calculationData.value.data.onCreateCalc,
          ...prevState.slice(0, 9),
        ]);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  async function addCalculation() {
    try {
      if (currentCalculation.length == 0) return;
      const data = {
        value: currentCalculation.join(" ").trim(),
        session: "default",
      };
      await API.graphql(graphqlOperation(createCalc, { input: data }));
    } catch (err) {
      console.log("error creating calculation:", err);
    }
  }

  const fetchCalculations = async () => {
    try {
      const input = {
        session: "default",
        sortDirection: "DESC",
        limit: 10,
      };
      const calculationData = await API.graphql(
        graphqlOperation(listCalcs, input)
      );
      const calculations = calculationData.data.listCalcs.items;
      console.log(calculations);
      setCalculations(calculations);
    } catch (err) {
      console.log("error fetching calculation", err);
    }
  };

  return (
    <div>
      <NavBar />
      <div
        style={{
          // width: "100%",
          paddingTop: 70,
          height: "100vh",
        }}
      >
        <Grid
          container
          style={{ flexGrow: 1, backgroundColor: "#eeeeee", height: "100%" }}
          spacing={2}
        >
          <Grid item xs={6}>
            {/* <CalculationList calculations={calculations} /> */}
            <Paper style={{ margin: 20, padding: 10, flex: 1 }} elevation="3">
              <Typography variant="h6">Recent</Typography>
              <List>
                {calculations.map((calculation) => (
                  <div>
                    <ListItem>
                      <ListItemText primary={calculation.value} />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              style={{ padding: 20, margin: 20, width: "280px" }}
              elevation="2"
            >
              <Calculator
                onAddCalculation={addCalculation}
                setCurrentCalculation={setCurrentCalculation}
                currentCalculation={currentCalculation}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;

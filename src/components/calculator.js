import React, { useState, useEffect, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "5px 5px 5px 0px",
  },
  displayField: {
    margin: "0px 0px 10px",
  },
}));

function Calculator(props) {
  //   const [currentCalculation, setCurrentCalculation] = useState([]);
  const [display, setDisplay] = useState("");
  const [previousKey, setPreviousKey] = useState("");
  const [firstValue, setFirstValue] = useState("");
  const [operator, setOperator] = useState("");
  const { onAddCalculation, setCurrentCalculation, currentCalculation } = props;
  const classes = useStyles();

  useEffect(() => {
    if (currentCalculation.includes("=")) {
      console.log("submit called");
      submit();
    }
  }, [currentCalculation]);

  const calculate = (num1, operator, num2) => {
    if (operator === "add") {
      addToCurrentCalculation(num1, "+", num2);

      return parseFloat(num1) + parseFloat(num2);
    } else if (operator === "subtract") {
      addToCurrentCalculation(num1, "-", num2);

      return parseFloat(num1) - parseFloat(num2);
    } else if (operator === "multiply") {
      addToCurrentCalculation(num1, "x", num2);

      return parseFloat(num1) * parseFloat(num2);
    } else {
      addToCurrentCalculation(num1, "/", num2);

      return parseFloat(num1) / parseFloat(num2);
    }
  };

  const addToCurrentCalculation = (num1, operator, num2) => {
    var isFirstExpression = currentCalculation.length === 0;

    if (isFirstExpression) {
      setCurrentCalculation((oldCalculation) => [
        ...oldCalculation,
        num1,
        operator,
        num2,
      ]);
    } else
      setCurrentCalculation((oldCalculation) => [
        ...oldCalculation,
        operator,
        num2,
      ]);
  };

  async function submit() {
    if (currentCalculation.length === 0) return;
    try {
      await onAddCalculation();
    } catch (err) {
      console.log("error submitting calculation", err);
    }
  }

  const handleClick = (event) => {
    const key = event.target;
    const action = event.currentTarget.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display;

    if (!action) {
      setDisplay(
        displayedNum === "0" || previousKey === "operator"
          ? keyContent
          : display + keyContent
      );
      setPreviousKey("number");
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      if (firstValue && operator && previousKey !== "operator") {
        if (previousKey === "calculate") {
          setPreviousKey("operator");
          setOperator(action);
          return;
        }
        console.log("entered");
        let calcValue = calculate(firstValue, operator, display);
        setDisplay(calcValue);
        setFirstValue(calcValue);
      } else setFirstValue(display);

      setPreviousKey("operator");
      setOperator(action);
    }

    if (action === "decimal") {
      if (!display.includes(".")) setDisplay(display + ".");
      else if (previousKey === "operator") setDisplay("0.");

      setPreviousKey("decimal");
    }

    if (action === "clear") {
      setFirstValue("");
      setDisplay("");
      setPreviousKey("clear");
      setCurrentCalculation([]);
    }

    if (action === "calculate") {
      if (firstValue) {
        if (previousKey === "calculate") {
          setFirstValue(display);
        } else {
          let result = calculate(firstValue, operator, display);
          addToCurrentCalculation(null, "=", result);
          setDisplay(result);
          setFirstValue(result);
        }
      }

      setPreviousKey("calculate");
    }
  };

  return (
    <Fragment>
      <Typography
        style={{ height: 50, backgroundColor: "#eeeeee" }}
        variant="h3"
      >
        {display}
      </Typography>

      <Grid>
        <Grid item>
          <Button
            className={classes.button}
            data-action="add"
            onClick={handleClick}
            variant="contained"
            color="secondary"
          >
            +
          </Button>
          <Button
            className={classes.button}
            data-action="subtract"
            onClick={handleClick}
            variant="contained"
            color="secondary"
          >
            -
          </Button>
          <Button
            className={classes.button}
            data-action="multiply"
            onClick={handleClick}
            variant="contained"
            color="secondary"
          >
            x
          </Button>
          <Button
            className={classes.button}
            data-action="divide"
            onClick={handleClick}
            variant="contained"
            color="secondary"
          >
            ÷
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            7
          </Button>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            8
          </Button>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            9
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            4
          </Button>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            5
          </Button>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            6
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            1
          </Button>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            2
          </Button>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            3
          </Button>
        </Grid>
        <Grid item sm>
          <Button
            className={classes.button}
            onClick={handleClick}
            variant="contained"
            color="primary"
          >
            0
          </Button>
          <Button
            className={classes.button}
            onClick={handleClick}
            data-action="decimal"
            variant="contained"
            color="secondary"
          >
            .
          </Button>
          <Button
            className={classes.button}
            onClick={handleClick}
            data-action="clear"
            variant="contained"
            color="primary"
          >
            AC
          </Button>
          <Button
            className={classes.button}
            onClick={handleClick}
            data-action="calculate"
            variant="contained"
            color="primary"
          >
            =
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Calculator;

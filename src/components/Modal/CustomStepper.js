import React, { useLayoutEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import GetAppStepper from "../GetAppStepper/GetAppStepper";
import Tickets from "../TicketStepper/Tickets";
import CustomerDetailsStepper from "../EventCustomerDetailsStepper/CustomerDetailsStepper";
import { useLocation } from "react-router-dom";
import TicketsNew from "../TicketStepper/TicketsNew";

function CustomStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const myRef = useRef(null);

  const location = useLocation();

  

  useLayoutEffect(() => {
    if ( myRef.current) {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeStep]);

  const handleNext = () => {
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
      // return <Tickets onContinue={handleNext} />;
        return <TicketsNew onContinue={handleNext} />;
      case 1:
        return <CustomerDetailsStepper onContinue={handleNext} />;
      default:
        return <GetAppStepper onContinue={handleNext} />;
    }
  };

  return (
    <Box sx={{ width: "100%" }} ref={myRef}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        connector={<StepConnector />}
        sx={{ visibility: "hidden" }}
      >
        <Step completed={completed[0]}>
          <StepButton onClick={() => setActiveStep(0)} />
        </Step>
        <Step completed={completed[1]}>
          <StepButton onClick={() => setActiveStep(1)} />
        </Step>
        <Step completed={completed[2]}>
          <StepButton onClick={() => setActiveStep(2)} />
        </Step>
      </Stepper>
      <div>
        <Typography  sx={{ mt: 2, mb: 1 }}>
          {renderStepContent(activeStep)}
        </Typography>
      </div>
    </Box>
  );
}

export default CustomStepper;

const StepConnector = () => null;

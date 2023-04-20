import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';

const ScheduleSurveyStepper = () => {
    const [step, setStep] = useState(1);
    const handleNext = () => {
        setStep(step + 1);
    }
    //   const [active, setActive] = useState(1);
    //   const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    //   const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <div id="schedule-survey" className="content">
                <div className="wrapper">
                    <div className='step-header d-flex justify-content-between'>
                        <p className={step === 1 && 'active'}>Details</p>
                        <p className={step === 2 && 'active'}>Select Provider Organization</p>
                        <p className={step === 3 && 'active'}>Select Object</p>
                        <p className={step === 4 && 'active'}>Review & Confirm</p>
                    </div>
                    <div className='progress'>

                    </div>
                    {step === 1 && (
                        <div className="holder">
                            <p>1</p>
                            <div className="t-a-r btns schedule-survey-btn">
                                <Button
                                    variant="subtle"
                                >
                                    Cancel
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button onClick={() => handleNext()}>Next {">"}</Button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="holder">
                            <p>2</p>
                            <div className="t-a-r btns schedule-survey-btn">

                                <Button
                                    variant="subtle"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="default"
                                    onClick={() => {
                                        setStep(1);
                                    }}

                                >
                                    {"<"} Previous
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button onClick={() => handleNext()}>Next {">"}</Button>
                            </div>
                        </div>
                    )}
                    {(step === 3) && (
                        <div className="holder">

                            <p>3</p>
                            <div className="t-a-c schedule-survey-btn">
                                <Button
                                    variant="subtle"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="default"
                                    onClick={() => {
                                        setStep(2);
                                    }}

                                >
                                    {"<"} Previous
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button onClick={() => handleNext()}>Next {">"}</Button>
                            </div>

                        </div>

                    )}
                    {step === 4 && (

                        <div className="holder">

                            <p>4</p>
                            <div className="t-a-c schedule-survey-btn">
                                <Button
                                    variant="subtle"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="default"
                                    onClick={() => {
                                        setStep(3);
                                    }}

                                >
                                    {"<"} Previous
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button>Confirm</Button>
                            </div>
                        </div>

                    )}
                </div>

            </div>

            {/* <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
        </>
    );
}

export default ScheduleSurveyStepper
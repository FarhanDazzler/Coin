import React, {useState} from "react";
import Button from "../MDM/MDM_Tab_Buttons/Button";
import CustomModal from "../../components/UI/CustomModal";
import "./AssessmentBankLandingPage.scss";
import Stepper from "./Stepper";

const AssessmentBankLandingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const handleSheduleSurvey = () => {
        setShowModal(true);
    }
    return (
        <>
            <Button
                color="neutral"
                className="ml-4"
                onClick={handleSheduleSurvey}
            >
                Schedule Survey
            </Button>
            <CustomModal
                className="schedule-survey"
                open={showModal}
                onClose={() => setShowModal(false)}
                width={900}
                title="Schedule Survey"
                bodyClassName="p-0"
            >
                <Stepper />
            </CustomModal>
        </>
    )
}

export default AssessmentBankLandingPage
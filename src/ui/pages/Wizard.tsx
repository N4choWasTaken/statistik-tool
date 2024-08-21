import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import Step1 from "../components/wizard/gameInfo";
import Step2 from "../components/wizard/selectPlayers";
import { createGame } from "../../services/Wizard/createGame";
import { Player } from "../../services/Wizard/selectPlayers";

const Wizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({}); // create type
  const [active, setActive] = useState<Player[]>([]); //Active Players

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await createGame(
        Timestamp.now(),
        formData.hometeam,
        formData.guestteam,
        active,
        false
      );
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const handleChange = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <div>
      {currentStep === 1 && (
        <Step1
          hometeam={formData.hometeam || ""}
          guestteam={formData.guestteam || ""}
          onChange={handleChange}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirstStep={true}
        />
      )}
      {currentStep === 2 && (
        <Step2
          onNext={handleNext}
          onPrev={handlePrev}
          isLastStep={true}
          active={active}
          setActive={setActive}
        />
      )}
    </div>
  );
};

export default Wizard;

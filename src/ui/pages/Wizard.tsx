import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import Step1 from "../components/wizard/gameInfo";
import Step2 from '../components/wizard/selectPlayers';
import { createGame } from "../../services/Wizard/createGame";
import usePlayers from "../../hooks/usePlayers";

const Wizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({}); // create type

  const { players, loading, error } = usePlayers();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
      await createGame(Timestamp.now(), formData.hometeam, formData.guestteam, players)
      alert("Game created successfully!");
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
        />
        )}
    </div>
  );
};

export default Wizard;

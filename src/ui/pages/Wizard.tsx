import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase";
import Step1 from "../components/wizard/gameInfo";

const Wizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const handleNext = () => {
    if (currentStep < 3) {
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
      await addDoc(collection(db, "Games"), {
        ...formData,
        Date: new Date(formData.date), // Convert date to a proper Date object
      });
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
          isFirstStep={currentStep === 1}
        />
      )}
      {currentStep === 2 && <div>new step</div>}
    </div>
  );
};

export default Wizard;

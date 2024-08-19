import React from "react";

interface WithNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  isLastStep?: boolean;
  isFirstStep?: boolean;
}

function withNavigation<T>(Component: React.ComponentType<T>) {
  return (props: T & WithNavigationProps) => {
    const { onNext, onPrev, isLastStep, isFirstStep, ...restProps } = props;

    return (
      <div>
        <Component {...(restProps as T)} />
        <div className="section">
          {!isFirstStep && <button onClick={onPrev}>Previous</button>}
          <button className="wizard__btn" onClick={onNext}>
            {isLastStep ? "Create Game" : "Select Players"}
          </button>
        </div>
      </div>
    );
  };
}

export default withNavigation;

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
          {!isFirstStep && (
            <button className="wizard__btn" onClick={onPrev}>
              <svg
                style={{ marginRight: "10px" }}
                width="23"
                height="12"
                viewBox="0 0 23 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 6.75H22.75V5.25H22V6.75ZM0.46967 5.46967C0.176777 5.76256 0.176777 6.23744 0.46967 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989592 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.46967 5.46967ZM22 5.25H1V6.75H22V5.25Z"
                  fill="white"
                />
              </svg>
              Previous
            </button>
          )}

          <button className="wizard__btn" onClick={onNext}>
            {isLastStep ? "Create Game" : "Select Players"}
            <svg
              style={{ marginLeft: "10px" }}
              width="23"
              height="12"
              viewBox="0 0 23 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.25004H0.25V6.75004H1V5.25004ZM22.5303 6.53037C22.8232 6.23748 22.8232 5.7626 22.5303 5.46971L17.7574 0.696739C17.4645 0.403839 16.9896 0.403839 16.6967 0.696739C16.4038 0.989639 16.4038 1.46454 16.6967 1.75744L20.9393 6.00004L16.6967 10.2427C16.4038 10.5356 16.4038 11.0104 16.6967 11.3033C16.9896 11.5962 17.4645 11.5962 17.7574 11.3033L22.5303 6.53037ZM1 6.75004L22 6.75004V5.25004L1 5.25004V6.75004Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };
}

export default withNavigation;

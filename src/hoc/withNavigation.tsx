import React from 'react';

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
        <div style={{ marginTop: '20px' }}>
          {!isFirstStep && <button onClick={onPrev}>Previous</button>}
          <button onClick={onNext} style={{ marginLeft: '10px' }}>
            {isLastStep ? 'Create Game' : 'Next'}
          </button>
        </div>
      </div>
    );
  };
}

export default withNavigation;
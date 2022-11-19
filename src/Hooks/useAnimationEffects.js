import { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';

/**
 * hook to return animation styles for a component
 * if shouldAnimate is true, the component will animate from fromStyles to toStyles
 * if no duration, timingFunction or delay is provided, the default values will be used
 *
 * @param {{ [key: string]: string }} fromStyles - css styles object for the element before animation
 * @param {{ [key: string]: string }} toStyles - css styles object for the element after animation
 * @param {boolean} shouldAnimate - boolean to determine if the animation should be played
 * @param {number[]} durations - array of durations for each transition
 * @param {string[]} timingFunctions - array of timing functions for each transition
 * @param {number[]} delays - array of delays for each transition
 * @returns {{ [key: string]: string }} - css styles object for the element to be animated
 */
const useAnimationStyles = (fromStyles, toStyles, shouldAnimate, durations, timingFunctions, delays) => {
  const transitionString = useMemo(() => {
    return Object.keys(fromStyles)
      .filter((style) => style !== 'transition')
      .reduce((acc, key, i) => {
        const duration = `${durations?.[i] || 0.5}s`;
        const timingFunction = timingFunctions?.[i] || 'ease-in-out';
        const delay = `${delays?.[i] || 0}s`;
        return `${acc ? `${acc}, ` : ''}${key} ${duration} ${timingFunction} ${delay}`;
      }, '');
  }, [durations, timingFunctions, delays, fromStyles]);

  const [styles, setStyles] = useState(() =>
    shouldAnimate ? { ...fromStyles, transition: transitionString } : { ...toStyles, transition: transitionString }
  );

  useEffect(() => {
    if (shouldAnimate) {
      setTimeout(() => {
        setStyles({ ...toStyles, transition: transitionString });
      }, 0);
    }
  }, [shouldAnimate, toStyles, transitionString]);

  return styles;
};

export default useAnimationStyles;

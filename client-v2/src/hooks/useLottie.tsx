import lottie from "lottie-web";
import { useEffect, useRef, useState} from "react";
import type {AnimationConfigWithData, AnimationItem, AnimationDirection, RendererType } from "lottie-web";

type LottieOptions = {
  animationData: unknown;
	autoplay?: boolean;
	loop?: boolean;
}

const useLottie = <T extends RendererType>(props: LottieOptions) => {
  const {animationData, autoplay, loop } = props;
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const animationInstanceRef = useRef<AnimationItem>();
  const animationContainer = useRef<HTMLDivElement>(null);

  const play = () => animationInstanceRef.current?.play();
  const stop = () => animationInstanceRef.current?.stop();
  const pause = () => animationInstanceRef.current?.pause();
  const setSpeed = (speed: number) => animationInstanceRef.current?.setSpeed(speed);

  const goToAndPlay = (value: number, isFrame?: boolean): void => {
    animationInstanceRef.current?.goToAndPlay(value, isFrame);
  };

  const goToAndStop = (value: number, isFrame?: boolean): void => {
    animationInstanceRef.current?.goToAndStop(value, isFrame);
  };

  const setDirection = (direction: AnimationDirection): void => {
    animationInstanceRef.current?.setDirection(direction);
  };

  const setSubframe = (useSubFrames: boolean): void => {
    animationInstanceRef.current?.setSubframe(useSubFrames);
  };

  const getDuration = (inFrames?: boolean): number | undefined => animationInstanceRef.current?.getDuration(inFrames);

  const destroy = () => {
    animationInstanceRef.current?.destroy();
    animationInstanceRef.current = undefined;
  };

  const loadAnimation = () => {
    if (!animationContainer.current) {
      return;
    }

    // Destroy any previous instance
    animationInstanceRef.current?.destroy();

    // Build the animation configuration
    const config: AnimationConfigWithData<T> = {
      ...props,
      container: animationContainer.current,
    };

    // Save the animation instance
    animationInstanceRef.current = lottie.loadAnimation(config);

    setAnimationLoaded(!!animationInstanceRef.current);

    // Return a function that will clean up
    return () => {
      animationInstanceRef.current?.destroy();
      animationInstanceRef.current = undefined;
    };
  };

  useEffect(() => {
    const onUnmount = loadAnimation();

    return () => onUnmount?.();
  }, [animationData, loop]);

  // Update the autoplay state
  useEffect(() => {
    if (!animationInstanceRef.current) {
      return;
    }

    animationInstanceRef.current.autoplay = !!autoplay;
  }, [autoplay]);

  return {
    play,
    stop,
    pause,
    setSpeed,
    goToAndStop,
    goToAndPlay,
    setDirection,
    setSubframe,
    getDuration,
    destroy,
    animationLoaded,
    animationContainerRef: animationContainer,
  };
};

export default useLottie;

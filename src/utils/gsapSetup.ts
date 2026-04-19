import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export const setupGsap = () => {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  return { gsap, ScrollTrigger };
};

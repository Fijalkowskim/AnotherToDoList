export const toDoAnimation = {
  none: {
    scale: 0,
    opacity: 0,
  },
  visible: { scale: 1, opacity: 1 },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      mass: 0.1,
    },
  },
  toggleIsDone: {
    scale: 1,
    duration: 0.2,
    opacity: 1,
  },
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 10,
    mass: 0.5,
  },
};

export const FIRST_PAGE_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'password',
  'confirmPassword',
  'gender',
  'day',
  'month',
  'year',
] as const;

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const scaleVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const conditionalSlideVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  visible: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export const slideLeftVariants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

export const slideAboveVariants = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

export const modalVariants = {
  hidden: {
    opacity: 0,
    y: '100%',
    scale: 0, // Start small (invisible)
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    y: '-100%',
    scale: 1, // Full size
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    y: '100%',
    scale: 0, // Shrink back to invisible
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

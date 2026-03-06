export const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeOut"
      }
    }
  };
};

export const fadeUp = (delay: number) => {
	return {
		hidden: {
			opacity: 0,
			y: 100,
			scale: 0.5,
		},
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.5,
				delay: delay,
				ease: 'easeInOut',
			},
		},
		exit: {
			opacity: 0,
			y: 50,
			transition: {
				duration: 0.2,
				ease: 'easeInOut',
			},
		},
	};
};

export const fadeInUp = {
		hidden: {
			opacity: 0,
			y: 40,
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: 'easeOut',
			},
		},
	};

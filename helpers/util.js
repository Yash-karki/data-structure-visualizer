let speed = 300; // default

const sleep = () => new Promise((resolve) => setTimeout(resolve, speed));

const setSpeed = (value) => {
  speed = Math.max(50, Math.min(2000, value));
};

export { sleep, setSpeed };
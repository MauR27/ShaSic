const particlesConfig = {
  detectRetina: false,
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  fpsLimit: 120,
  particles: {
    number: {
      value: 200,
    },
    color: {
      value: "#322659",
    },
    shape: {
      type: "square",
    },
    size: {
      random: {
        enable: true,
        minimumValue: 1,
      },
      value: 2,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "random",
      straight: true,
    },
  },
};

export default particlesConfig;

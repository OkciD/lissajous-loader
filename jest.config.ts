import type {Config} from 'jest';

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  setupFiles: ["jest-canvas-mock"]
};

export default config;

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], 
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", 
    "\\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/src/mocks/staticFileMock.ts"

  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
};
export default config;

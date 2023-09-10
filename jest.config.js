export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  "ts-jest": {
    tsconfig: "tsconfig.json",
  },

  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
};

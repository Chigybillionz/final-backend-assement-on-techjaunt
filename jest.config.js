const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",

  testEnvironment: "node",

  roots: ["<rootDir>/tests"],

  testMatch: ["**/*.test.ts"],

  moduleFileExtensions: ["ts", "js", "json"],

  collectCoverageFrom: ["src/**/*.ts", "!src/server.ts", "!src/**/*.d.ts"],

  coverageDirectory: "coverage",

  clearMocks: true,

  verbose: true,
};

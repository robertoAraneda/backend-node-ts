/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/src/config/singleton.ts'],
};

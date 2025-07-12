import '@testing-library/jest-dom';

jest.mock('@/env', () => ({
  env: require('@/env/env.node').env,
}));

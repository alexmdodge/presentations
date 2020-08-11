export const setAttributeMock = jest.fn();

export const MockVideoElement = jest.fn().mockImplementation(() => {
  return {
    setAttribute: setAttributeMock
  };
});

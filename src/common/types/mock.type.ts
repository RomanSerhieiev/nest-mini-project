export type MockType<T> = jest.Mocked<Pick<T, keyof T>>;

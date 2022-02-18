export const INITIAL_STATE = {
  user: null,
  // Mock functions that should never be called, they are just here to pass the type checks
  login: (username: string, password: string) => {
    return new Promise<any>(function (resolve, reject) {
      reject({});
    });
  },
  logout: () => {
    return new Promise<void>(function (resolve, reject) {
      reject();
    });
  },
  getUserData: () => {
    return new Promise<any>(function (resolve, reject) {
      reject({});
    });
  },
};
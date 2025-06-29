// import { store } from '../redux/store.js';

// export const handleApi = async (apiFunc) => {
//   try {
//     const res = await apiFunc(); // fetchApi / postApi / etc.
//     return res;
//   } catch (err) {
//     store.dispatch(showToast({
//       type: 'error',
//       message: err.message || "Something went wrong.",
//     }));
//     throw err; // rethrow so the calling component can still react
//   }
// };

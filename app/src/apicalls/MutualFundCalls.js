import axios from "axios";
import {
  GetCurrentMFFailed,
  GetCurrentMFStarted,
  GetCurrentMFSuccess,
  GetMFListFailed,
  GetMFListStarted,
  GetMFListSuccess,
} from "../redux/MutualFundSlice";
import { throttle } from "lodash";

// export const GetMutualFund = async (dispatch) => {
//   const List = [
//     {
//       code: 119091,
//       name: "hdfc-liquid-fund-direct-growth",
//     },
//     {
//       code: 119800,
//       name: "sbi-premier-liquid-fund-direct-growth",
//     },
//     {
//       code: 119609,
//       name: "sbi-magnum-balanced-fund-direct-growth",
//     },
//     {
//       code: 100119,
//       name: "hdfc-growth-fund-direct-growth",
//     },
//     {
//       code: 100047,
//       name: "birla-sun-life-cash-plus-direct-growth",
//     },
//     {
//       code: 103340,
//       name: "icici-prudential-liquid-fund-direct-plan-growth",
//     },
//     {
//       code: 119766,
//       name: "kotak-liquid-scheme-direct-growth",
//     },
//     {
//       code: 134427,
//       name: "uti-liquid-cash-plan-direct-growth",
//     },
//     {
//       code: 122639,
//       name: "parag-parikh-long-term-value-fund-direct-growth",
//     },
//   ];

//   const Result = [];

//   dispatch(GetMFListStarted());

//   try {
//     for (let mf of List) {
//       console.log(mf.name);
//       const res = await axios.get(
//         `${import.meta.env.VITE_STOCK_API}/get-mutual-fund/${mf.name}/${
//           mf.code
//         }`
//       );

//       if (res.status === 200) {
//         Result.push(...res.data);
//       }
//     }

//     const serializableArray = Result?.map((obj) => ({ ...obj }));

//     sessionStorage.setItem("Mflist", JSON.stringify(serializableArray));

//     console.log(Result);
//     dispatch(GetMFListSuccess(Result));
//   } catch (e) {
//     dispatch(GetMFListFailed());
//     console.log(e);
//   }
// };

export const GetMutualFund = async (dispatch) => {
  const List = [
    {
      code: 119091,
      name: "hdfc-liquid-fund-direct-growth",
    },
    {
      code: 120069,
      name: "hsbc-small-cap-fund-direct-growth",
    },
    {
      code: 119609,
      name: "sbi-magnum-balanced-fund-direct-growth",
    },
    {
      code: 100119,
      name: "hdfc-growth-fund-direct-growth",
    },
    {
      code: 100047,
      name: "birla-sun-life-cash-plus-direct-growth",
    },
    {
      code: 103340,
      name: "icici-prudential-liquid-fund-direct-plan-growth",
    },
    {
      code: 119766,
      name: "kotak-liquid-scheme-direct-growth",
    },
    {
      code: 134427,
      name: "uti-liquid-cash-plan-direct-growth",
    },
    {
      code: 122639,
      name: "parag-parikh-long-term-value-fund-direct-growth",
    },
  ];

  dispatch(GetMFListStarted());
  try {
    const throttledRequests = List.map(
      (mf) =>
        axios
          .get(
            `${import.meta.env.VITE_STOCK_API}/get-mutual-fund/${mf.name}/${
              mf.code
            }`
          )
          .then((res) => {
            if (res.status === 200) {
              return res.data;
            } else {
              return [];
            }
          })
          .catch(() => []) // Handle errors for individual requests
    );

    const results = await Promise.all(throttledRequests);
    const Result = results.flat();

    sessionStorage.setItem("Mflist", JSON.stringify(Result));

    dispatch(GetMFListSuccess(Result));
  } catch (e) {
    dispatch(GetMFListFailed());
    console.log(e);
  }
};

export const GetCurrentMF = async (dispatch, code) => {
  dispatch(GetCurrentMFStarted());

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_STOCK_API}/get-mutual-fund-history/${code}`
    );

    console.log(res.data);

    dispatch(GetCurrentMFSuccess(res.data));
  } catch (e) {
    dispatch(GetCurrentMFFailed());
  }
};

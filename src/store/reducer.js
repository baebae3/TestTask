import flights from "./../flights.json";
import {
  SORT_BY_HIGH_PRICE,
  SORT_BY_LOW_PRICE,
  SORT_BY_DURATION,
  SORT_BY_NONSTOP,
  SORT_BY_STOP,
  SORT_BY_PRICE1,
} from "./action";

const initialState = {
  flights,
  isCheked: false,
  isChekedStop: false,
};

const aviaMock = (state = initialState, action) => {
  switch (action.type) {
    case SORT_BY_HIGH_PRICE:
      return {
        ...state,
        result: [
          ...state.flights.result.flights.sort((a, b) =>
            +a.flight.price.total.amount < +b.flight.price.total.amount
              ? 1
              : -1,
          ),
        ],
      };
    case SORT_BY_LOW_PRICE:
      return {
        ...state,
        result: [
          ...state.flights.result.flights.sort((a, b) =>
            +a.flight.price.total.amount > +b.flight.price.total.amount
              ? 1
              : -1,
          ),
        ],
      };
    case SORT_BY_DURATION:
      return {
        ...state,
        result: [
          ...state.flights.result.flights.sort((a, b) =>
            a.flight.legs[0].duration + a.flight.legs[1].duration >
            b.flight.legs[0].duration + b.flight.legs[1].duration
              ? 1
              : -1,
          ),
        ],
      };

    case SORT_BY_NONSTOP:
      return {
        ...state,
        isCheked: !state.isCheked,
        result: [
          state.isCheked === true
            ? {
                ...state.flights.result.flights.filter(
                  (e) => +e.flight.legs[0].segment[0].stops !== 0,
                ),
              }
            : { ...state },
        ],
      };

    case SORT_BY_STOP:
      return {
        isChekedStop: !state.isChekedStop,
        ...state,
        result: [
          state.isChekedStop === true
            ? {
                ...state.flights.result.flights.filter(
                  (e) => +e.flight.legs[0].segments[0].stops !== 0,
                ),
              }
            : { ...state },
        ],
      };

    case SORT_BY_PRICE1:
      return {
        ...state,
        result: [
          ...state.flights.result.flights.filter(
            (e) => e.flight.price.total.amount >= action.payload,
          ),
        ],
      };

    default:
      return state;
  }
};
export default aviaMock;

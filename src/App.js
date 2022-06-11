import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockFour,
  faClock,
  faBriefcaseClock,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  sortByHighPrice,
  sortByLowPrice,
  sortByDuration,
  sortByNonStop,
  sortByStop,
  sortByPrice1,
} from "./store/action";
// import flights from "./flights.json";
import { library } from "@fortawesome/fontawesome-svg-core";

function App() {
  const [list, setList] = useState(5);
  const [date, setDate] = useState("");
  const flightsStore = useSelector((state) => state);
  const [priceValue, setPriceValue] = useState(1);
  const [priceValue2, setPriceValue2] = useState(1000);
  const dispatch = useDispatch();

  const changePrice = (e) => {
    setPriceValue(e.target.value);
    if (priceValue <= 0 || priceValue === -1) {
      setPriceValue(1);
    }
  };

  const sortHigh = () => {
    dispatch(sortByHighPrice());
    console.log("done");
  };

  const sortLow = () => {
    dispatch(sortByLowPrice());
    console.log("done");
  };

  const sortDuration = () => {
    dispatch(sortByDuration());
    console.log("done");
  };

  const sortNonStop = () => {
    dispatch(sortByNonStop());
    console.log("done");
  };

  const sortStop = () => {
    dispatch(sortByStop());
    console.log(
      flightsStore.flights.result.flights[0].flight.legs[0].segments[0].stops,
    );
  };
  const setPrice1 = (priceValue) => {
    dispatch(sortByPrice1(priceValue));
    console.log("done");
  };

  const changePrice2 = (e) => {
    setPriceValue2(e.target.value);
  };

  const months = [
    "янв.",
    "фев.",
    "мар.",
    "апр.",
    "мая",
    "июн.",
    "июл.",
    "авг.",
    "сент.",
    "окт.",
    "ноя.",
    "дек",
  ];

  const showMore = () => {
    setList(list + 5);
  };

  return (
    <>
      <div className="wrapper">
        <div className="sort">
          <p>Сортировать</p>
          <br />
          <div>
            <input
              onClick={sortHigh}
              type="radio"
              name="sort"
              id="choice1"
              value="highPrice"
            ></input>
            <label htmlFor="choice1"> - По возрастанию цены</label>
            <br />
            <input
              onClick={sortLow}
              type="radio"
              name="sort"
              id="choice2"
              value="lowPrice"
            ></input>
            <label htmlFor="choice2"> - По убыванию цены</label>
            <br />
            <input
              onClick={sortDuration}
              type="radio"
              name="sort"
              id="choice3"
              value="duration"
            ></input>
            <label htmlFor="choice3"> - По времени пути</label>
          </div>
          <p>Фильтровать</p>
          <div>
            <input
              type="checkbox"
              id="choice4"
              onClick={() => sortNonStop()}
            ></input>
            <label htmlFor="choice4">Без пересадок</label>
            <br />
            <input
              type="checkbox"
              id="choice5"
              onClick={() => sortStop()}
            ></input>
            <label htmlFor="choice4">1 пересадка</label>
          </div>
          <p>Цена</p>
          <div className="change_price">
            <span>От</span>{" "}
            <input
              onClick={setPrice1}
              type="number"
              value={priceValue}
              onChange={changePrice}
            ></input>
            <span>До</span>{" "}
            <input
              type="number"
              value={priceValue2}
              onChange={changePrice2}
            ></input>
          </div>
        </div>
        <div className="ticket_cards">
          {flightsStore.flights.result.flights
            .slice(0, list)
            .map((ticket, index) => {
              return (
                <div key={index} className="ticket">
                  <div className="ticket__header">
                    <p>
                      {ticket.flight.price.total.amount}{" "}
                      {ticket.flight.price.total.currency}
                    </p>
                    <p>Стоимость для одного взрослого человека</p>
                  </div>

                  <div className="travel">
                    <p>
                      {ticket.flight.legs[0].segments[0].departureCity.caption}
                      {","}{" "}
                      {
                        ticket.flight.legs[0].segments[0].departureAirport
                          .caption
                      }
                    </p>
                    <p style={{ color: "#0087c9" }}>
                      ({ticket.flight.legs[0].segments[0].departureAirport.uid})
                      &#8594;
                    </p>
                    <p>
                      {ticket.flight.legs[0].segments[0].arrivalCity.caption}
                      {","}{" "}
                      {ticket.flight.legs[0].segments[0].arrivalAirport.caption}
                    </p>
                    <p style={{ color: "#0087c9" }}>
                      ({ticket.flight.legs[0].segments[0].arrivalAirport.uid})
                    </p>
                  </div>

                  <hr></hr>

                  <div className="time">
                    <div className="time_departure">
                      <p>
                        {ticket.flight.legs[0].segments[0].departureDate.slice(
                          11,
                          16,
                        )}
                      </p>
                      <p
                        style={{
                          color: "#0087c9",
                          fontSize: "18px",
                          textAlign: "center",
                        }}
                      >
                        {ticket.flight.legs[0].segments[0].departureDate.slice(
                          8,
                          10,
                        )}{" "}
                        {
                          months[
                            +ticket.flight.legs[0].segments[0].departureDate.slice(
                              5,
                              7,
                            ) - 1
                          ]
                        }
                      </p>
                    </div>

                    <div className="duration">
                      <p style={{ fontSize: "22px" }}>
                        <FontAwesomeIcon icon={faClock} />{" "}
                        {Math.floor(ticket.flight.legs[0].duration / 60)} ч{" "}
                        {ticket.flight.legs[0].duration -
                          Math.floor(ticket.flight.legs[0].duration / 60) *
                            60}{" "}
                        мин
                      </p>
                    </div>

                    <div className="time_arrival">
                      <p
                        style={{
                          color: "#0087c9",
                          fontSize: "18px",
                          textAlign: "center",
                        }}
                      >
                        {ticket.flight.legs[0].segments[0].arrivalDate.slice(
                          8,
                          10,
                        )}{" "}
                        {
                          months[
                            +ticket.flight.legs[0].segments[0].arrivalDate.slice(
                              5,
                              7,
                            ) - 1
                          ]
                        }{" "}
                      </p>
                      <p>
                        {ticket.flight.legs[0].segments[0].arrivalDate.slice(
                          11,
                          16,
                        )}
                      </p>
                    </div>
                  </div>

                  {ticket.flight.legs[0].segments[0].stops > 0 ? (
                    <div className="separator">
                      <hr></hr>
                      <p>{ticket.flight.legs[0].segments[0].stops} пересадка</p>
                    </div>
                  ) : (
                    <div className="separator">
                      <hr></hr>
                      <p>Без пересадок</p>
                    </div>
                  )}
                  <div className="carrier">
                    <p>Рейс выполняет: {ticket.flight.carrier.caption}</p>
                  </div>

                  <div className="ticket_separator"></div>

                  <div className="travel">
                    <p>
                      {ticket.flight.legs[1].segments[0].departureCity.caption}
                      {","}{" "}
                      {
                        ticket.flight.legs[1].segments[0].departureAirport
                          .caption
                      }
                    </p>
                    <p style={{ color: "#0087c9" }}>
                      ({ticket.flight.legs[1].segments[0].departureAirport.uid})
                      &#8594;
                    </p>
                    <p>
                      {ticket.flight.legs[1].segments[0].arrivalCity.caption}
                      {","}{" "}
                      {ticket.flight.legs[1].segments[0].arrivalAirport.caption}
                    </p>
                    <p style={{ color: "#0087c9" }}>
                      ({ticket.flight.legs[1].segments[0].arrivalAirport.uid})
                    </p>
                  </div>

                  <hr></hr>

                  <div className="time">
                    <div className="time_departure">
                      <p>
                        {ticket.flight.legs[1].segments[0].departureDate.slice(
                          11,
                          16,
                        )}
                      </p>
                      <p
                        style={{
                          color: "#0087c9",
                          fontSize: "18px",
                          textAlign: "center",
                        }}
                      >
                        {ticket.flight.legs[1].segments[0].departureDate.slice(
                          8,
                          10,
                        )}{" "}
                        {
                          months[
                            +ticket.flight.legs[1].segments[0].departureDate.slice(
                              5,
                              7,
                            ) - 1
                          ]
                        }
                      </p>
                    </div>

                    <div className="duration">
                      <p style={{ fontSize: "22px" }}>
                        <FontAwesomeIcon icon={faClock} className="icon" />{" "}
                        {Math.floor(ticket.flight.legs[1].duration / 60)} ч{" "}
                        {ticket.flight.legs[1].duration -
                          Math.floor(ticket.flight.legs[1].duration / 60) *
                            60}{" "}
                        мин
                      </p>
                    </div>

                    <div className="time_arrival">
                      <p
                        style={{
                          color: "#0087c9",
                          fontSize: "18px",
                          textAlign: "center",
                        }}
                      >
                        {ticket.flight.legs[1].segments[0].arrivalDate.slice(
                          8,
                          10,
                        )}{" "}
                        {
                          months[
                            +ticket.flight.legs[1].segments[0].arrivalDate.slice(
                              5,
                              7,
                            ) - 1
                          ]
                        }{" "}
                      </p>
                      <p>
                        {ticket.flight.legs[1].segments[0].arrivalDate.slice(
                          11,
                          16,
                        )}
                      </p>
                    </div>
                  </div>

                  {ticket.flight.legs[1].segments[0].stops > 0 ? (
                    <div className="separator">
                      <hr></hr>
                      <p>{ticket.flight.legs[1].segments[0].stops} пересадка</p>
                    </div>
                  ) : (
                    <div className="separator">
                      <hr></hr>
                      <p>Без пересадок</p>
                    </div>
                  )}
                  <div className="carrier">
                    <p>Рейс выполняет: {ticket.flight.carrier.caption}</p>
                  </div>
                  <div className="select">
                    <p>Выбрать</p>
                  </div>
                </div>
              );
            })}
          <div className="show_more">
            <button onClick={showMore}>Показать больше</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

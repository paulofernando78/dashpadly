import { useState, useEffect, useRef } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";
import { Icon } from "@/components/ui/Icon";

import { submitOnEnter } from "@/utils/keyboard";

function getWeatherIconName(code, isDay = true) {
  if (code === 0) return isDay ? "sun" : "moon";

  if ([1, 2, 3].includes(code)) return "cloudSun";

  if ([45, 48].includes(code)) return "cloudFog";

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return "cloudRain";
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "cloudSnow";
  }

  if ([95, 96, 99].includes(code)) {
    return "cloudLightning";
  }

  return "cloud";
}

function formatHourTime(time) {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: false,
  });
}

function formatWeekday(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export const Clock = ({
  location = "São Paulo, São Paulo, Brasil",
  latitude = -23.55052,
  longitude = -46.63331,
  timezone = "America/Sao_Paulo",
  onConfigChange,
  onClose,
}) => {
  const locationInputRef = useRef(null);

  // Clock
  const [time, setTime] = useState(new Date());

  // Selected weather location
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [selectedLatitude, setSelectedLatitude] = useState(latitude);
  const [selectedLongitude, setSelectedLongitude] = useState(longitude);
  const [selectedTimezone, setSelectedTimezone] = useState(timezone);

  // Loaded weather data
  const [weather, setWeather] = useState(null);

  // Weather edit state
  const [isEditingWeather, setIsEditingWeather] = useState(false);
  const [editLocation, setEditLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const currentTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: selectedTimezone,
  });

  const currentDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: selectedTimezone,
  });

  useEffect(() => {
    async function fetchWeather() {
      if (selectedLatitude == null || selectedLongitude == null) return;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedLatitude}&longitude=${selectedLongitude}&current=temperature_2m,weather_code,is_day&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7`,
      );

      const data = await response.json();

      const now = new Date();

      const nextHourIndex = data.hourly.time.findIndex((time) => {
        return new Date(time) > now;
      });

      const nextHours = data.hourly.time
        .slice(nextHourIndex, nextHourIndex + 6)
        .map((time, index) => ({
          time,
          temperature: Math.round(
            data.hourly.temperature_2m[nextHourIndex + index],
          ),
          weatherCode: data.hourly.weather_code[nextHourIndex + index],
        }));

      const nextDays = data.daily.time.map((date, index) => ({
        date,
        min: Math.round(data.daily.temperature_2m_min[index]),
        max: Math.round(data.daily.temperature_2m_max[index]),
        weatherCode: data.daily.weather_code[index],
      }));

      setWeather({
        current: {
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day,
        },
        nextHours,
        nextDays,
      });
    }

    fetchWeather();
  }, [selectedLatitude, selectedLongitude]);

  function handleEditWeather() {
    setEditLocation("");
    setLocationSuggestions([]);
    setIsEditingWeather(true);
  }

  useEffect(() => {
    if (!isEditingWeather) return;

    locationInputRef.current?.focus();
  }, [isEditingWeather]);

  async function handleConfirmWeather() {
    const locationName = editLocation.trim();

    if (!locationName) {
      setEditLocation("");
      setLocationSuggestions([]);
      setIsEditingWeather(false);
      return;
    }

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1&language=pt&format=json`,
    );

    const data = await response.json();
    const location = data.results?.[0];

    if (!location) return;

    const selectedLocationData = {
      location: `${location.name}${location.admin1 ? `, ${location.admin1}` : ""}, ${location.country}`,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone ?? "America/Sao_Paulo",
    };

    setSelectedLocation(selectedLocationData.location);
    setSelectedLatitude(selectedLocationData.latitude);
    setSelectedLongitude(selectedLocationData.longitude);
    setSelectedTimezone(selectedLocationData.timezone);
    onConfigChange?.(selectedLocationData);
    setIsEditingWeather(false);
    setEditLocation("");
    setLocationSuggestions([]);
  }

  async function handleLocationChange(event) {
    const value = event.target.value;

    setEditLocation(value);

    if (value.trim().length < 2) {
      setLocationSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        value,
      )}&count=5&language=pt&format=json`,
    );

    const data = await response.json();

    setLocationSuggestions(data.results ?? []);
  }

  function handleSelectLocation(selectedSuggestion) {
    const selectedLocationData = {
      location: `${selectedSuggestion.name}${
        selectedSuggestion.admin1 ? `, ${selectedSuggestion.admin1}` : ""
      }, ${selectedSuggestion.country}`,
      latitude: selectedSuggestion.latitude,
      longitude: selectedSuggestion.longitude,
      timezone: selectedSuggestion.timezone ?? "America/Sao_Paulo",
    };

    setSelectedLocation(selectedLocationData.location);
    setSelectedLatitude(selectedLocationData.latitude);
    setSelectedLongitude(selectedLocationData.longitude);
    setSelectedTimezone(selectedLocationData.timezone);
    onConfigChange?.(selectedLocationData);
    setEditLocation("");
    setLocationSuggestions([]);
    setIsEditingWeather(false);
  }

  return (
    <WidgetBody
      onClose={onClose}
      top={
        <>
          <span className="block">{currentTime}</span>
          <span className="text-lg">{currentDate}</span>
        </>
      }
      middle={
        !isEditingWeather ? (
          <div
            className="
              flex
              flex-col
              gap-2
              w-full
              h-37
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Icon name="mapPin" />
              <span className="truncate">{selectedLocation}</span>
            </div>
            {weather && (
              <div
                className="
                  grid
                  grid-cols-7
                  border-b
                  border-gray-400
                  pb-1.5
                "
              >
                <div
                  className="
                    grid
                    place-items-center
                    gap-1
                    p-1
                  "
                >
                  <span>Now</span>

                  <Icon
                    name={getWeatherIconName(
                      weather.current.weatherCode,
                      weather.current.isDay === 1,
                    )}
                    size={13}
                  />

                  <span>{weather.current.temperature}°</span>
                </div>

                {weather.nextHours.map((hour) => (
                  <div
                    key={hour.time}
                    className="
                      grid
                      place-items-center
                      gap-1
                      p-1
                    "
                  >
                    <span>{formatHourTime(hour.time)}</span>

                    <Icon
                      name={getWeatherIconName(hour.weatherCode)}
                      size={13}
                    />
                    <span>{hour.temperature}°</span>
                  </div>
                ))}
              </div>
            )}
            {weather && (
              <div
                className="
                  grid
                  grid-cols-8
                "
              >
                <div
                  className="
                      justify-self-center
                      flex
                      flex-col
                      justify-end
                      gap-2
                      p-1
                      text-sm
                    "
                >
                  <span>min</span>
                  <span>max</span>
                </div>
                {weather.nextDays.map((day) => (
                  <div
                    key={day.date}
                    className="
                        grid
                        place-items-center
                        gap-1
                        p-1
                      "
                  >
                    <span>{formatWeekday(day.date)}</span>

                    <Icon
                      name={getWeatherIconName(day.weatherCode)}
                      size={13}
                    />

                    <span>{day.min}°</span>
                    <span>{day.max}°</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            className="
            relative
            flex
            h-37
            "
          >
            {/* <Icon name="mapPin" size={25} /> */}
            <div>
              <label>
                <input
                  ref={locationInputRef}
                  type="text"
                  value={editLocation}
                  onChange={handleLocationChange}
                  onKeyDown={(event) =>
                    submitOnEnter(event, handleConfirmWeather)
                  }
                  placeholder="Type location"
                  className="  
                  w-full
                  border
                  rounded
                  px-2
                  pt-1
                  pb-1
                  "
                />
              </label>
              {locationSuggestions.length > 0 && (
                <div
                  className="
                    absolute
                    left-0
                    z-10
                    mt-2
                    p-1
                    w-full
                    h-30.25
                    bg-gray-700
                    rounded
                    shadow-lg
                    overflow-y-auto
                  "
                >
                  {locationSuggestions.map((location) => {
                    return (
                      <button
                        type="button"
                        key={location.id}
                        onClick={() => handleSelectLocation(location)}
                        className="
                          w-full
                          p-1
                          text-left
                          truncate
                          hover:bg-gray-600
                          rounded
                        "
                      >
                        <span>{location.name}</span>,{" "}
                        <span>
                          {location.admin1 ? `${location.admin1}, ` : ""}
                          {location.country}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )
      }
      bottom={
        <div>
          <WidgetControls>
            <WidgetControls.Edit
              isEditing={isEditingWeather}
              onEdit={handleEditWeather}
              onConfirm={handleConfirmWeather}
            />
          </WidgetControls>
        </div>
      }
    />
  );
};

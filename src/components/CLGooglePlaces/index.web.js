import React, { useEffect, useState } from "react";

import { View, TouchableOpacity } from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";

import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByLatLng,
} from "react-google-places-autocomplete";

const getUserLocation = () => {
  console.log("acquiring user location...");
  console.log(document.featurePolicy.allow);
  console.log(navigator.geolocation);
  if (navigator.geolocation) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          console.log(result.state);
          const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 5,
          };

          const success = (pos) => {
            var crd = pos.coords;
            geocodeByLatLng({
              lat: crd.latitude,
              lng: crd.longitude,
            })
              .then((results) => console.log(results))
              .catch((error) => console.error(error));
          };

          const error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          };
          navigator.geolocation.getCurrentPosition(success, error, options);
        } else if (result.state === "prompt") {
          console.log("prompt", result.state);
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
          console.log("denied");
          const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 5,
          };

          const success = (pos) => {
            var crd = pos.coords;
            geocodeByLatLng({
              lat: crd.latitude,
              lng: crd.longitude,
            })
              .then((results) => console.log(results))
              .catch((error) => console.error(error));
          };

          const error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          };
          navigator.geolocation.getCurrentPosition(success, error, options);
        }
        result.onchange = function () {
          console.log(result.state);
        };
      });
  } else {
    console.log("error po");
  }
};

const CLGooglePlaces = (props) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
  
    if (value != undefined) {
      geocodeByAddress(value.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          // console.log(value)
          const handler = props.action;
          if (handler)
            handler(lng, lat, value.value.description, value.value.place_id);
        });
    }
  }, [value]);
  return (
    <View>
      {props.apiKey == null ? (
        <h3 style={{ textAlign: "center" }}>Enter API Key</h3>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column", flex: 5 }}>
            <GooglePlacesAutocomplete
              apiKey={props.apiKey}
              autocompletionRequest={
                props.country == undefined ||
                props.country == null ||
                props.country == 0 ||
                props.country == 1
                  ? null
                  : {
                      componentRestrictions: { country: props.country },
                    }
              }
              selectProps={{
                value,
                onChange: setValue,
              }}
            />
          </View>
          {/* <TouchableOpacity
            style={{
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 5,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 4,
            }}
            onPress={getUserLocation}
          >
            <Icons name="my-location" size={20} color="#b0b0b0" />
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
};

export default CLGooglePlaces;

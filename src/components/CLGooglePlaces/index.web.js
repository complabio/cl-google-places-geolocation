import React, { useEffect, useState } from "react";

import { View, TouchableOpacity } from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";

import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByLatLng,
} from "react-google-places-autocomplete";

const CLGooglePlaces = (props) => {
  const [value, setValue] = useState(null);
  const [zip, setZip] = useState(null);

  useEffect(() => {
    if (value != undefined) {
      let zipCode = "";

      // geocodeByLatLng(value.label).then((results) =>
      //   console.log("bylatlong", results)
      // );

      geocodeByAddress(value.label)
        .then((results) => {
          // zipCode = results[0].address_components[6].long_name;
          const postal = results[0].address_components.find((e) => {
            return e.types.find((i) => i == "postal_code");
          });
          zipCode = postal != undefined ? postal.long_name : "";
          return getLatLng(results[0]);
        })
        .then(({ lat, lng }) => {
          const handler = props.action;
          if (handler)
            handler(
              lng,
              lat,
              value.value.description,
              value.value.place_id,
              zipCode
            );
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

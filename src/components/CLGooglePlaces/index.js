import React from "react";
import { StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const CLGooglePlaces = (props) => {

  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      placeholder="Enter Location"
      minLength={2}
      autoFocus={false}
      returnKeyType={"default"}
      fetchDetails={true}
      styles={{
        textInputContainer: {
        },
        textInput: {
          height: 38,
          color: "#5d5d5d",
          fontSize: 16,
          textAlign: "left",
          borderColor:'#b0b0b0',
          borderWidth:1,
          borderRadius:5
          
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
      requestUrl={{
        useOnPlatform: "all", // or "all"
        url: "https://maps.googleapis.com/maps/api", // or any proxy server that hits https://maps.googleapis.com/maps/api
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(data,details)
        const handler = props.action;
        if (handler)
          handler(
            details.geometry.location.lng,
            details.geometry.location.lat,
            data.description,
            data.place_id
          );
      }}
      query={
        props.country==null||props.country==undefined||props.country == 0||props.country == 1?
        {
          key: props.apiKey,
          language: "en"
        }
        :
        {
          key: props.apiKey,
          language: "en",
          components: "country:"+props.country
        }
      }
      
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CLGooglePlaces;

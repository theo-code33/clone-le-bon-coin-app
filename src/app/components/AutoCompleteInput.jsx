import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const AutoCompleteInput = ({credentials, setCredentials, isPostForm}) => {
    const inputLocation = useRef(null);
    const [geolocation, setGeolocation] = useState(null)
    const {id} = useParams();

    

    const defaultValue = () => {
        if(id !== undefined){
            console.log(credentials);
            return credentials.address.address
        }else if(credentials.location !== undefined){
            return credentials.location
        }else if(geolocation !== null){
            return geolocation
        }else{
            return ""
        }
    }

    const parseAddress = (autocompleteValue) => {
        let number_address = autocompleteValue.address_components.find((component) => component.types.includes("street_number"))
        if(number_address) number_address = number_address.long_name
        let route = autocompleteValue.address_components.find((component) => component.types.includes("route"))
        if(route) route = route.long_name
        let postal_code = autocompleteValue.address_components.find((component) => component.types.includes("postal_code"))
        if(postal_code) postal_code = postal_code.long_name
        let city = autocompleteValue.address_components.find((component) => component.types.includes("locality"))
        if(city) city = city.long_name
        let country = autocompleteValue.address_components.find((component) => component.types.includes("country"))
        if(country) country = country.long_name
        let administrative_area_level_1 = autocompleteValue.address_components.find((component) => component.types.includes("administrative_area_level_1"))
        if(administrative_area_level_1) administrative_area_level_1 = administrative_area_level_1.long_name
        let administrative_area_level_2 = autocompleteValue.address_components.find((component) => component.types.includes("administrative_area_level_2"))
        if(administrative_area_level_2) administrative_area_level_2 = administrative_area_level_2.long_name
        let address = `${number_address} ${route}, ${postal_code} ${city}, ${country}`
        let lat = autocompleteValue.geometry.location.lat()
        let lng = autocompleteValue.geometry.location.lng()

        return {
            number_address,
            route,
            postal_code,
            city,
            country,
            administrative_area_level_1,
            administrative_area_level_2,
            address,
            lat,
            lng
        }
    }

    const getGeolocation = () => {
        if (navigator.geolocation && id === undefined) {
            navigator.geolocation.getCurrentPosition(setLocation)
        }
    }

    const setLocation = (position) => {
        const lnglat = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ 'latLng': lnglat }, (results, status) => {
            if(status !== window.google.maps.GeocoderStatus.OK) {
                console.log(status);
            }
            if(status === window.google.maps.GeocoderStatus.OK) {
                console.log(results[0]);
                const dataFormated = parseAddress(results[0])
                setGeolocation(dataFormated)
                setCredentials((credential) => {
                    return {
                        ...credential,
                        location: dataFormated
                    }
                })
            }
        })
    }

    const addAutoComplete = () => {
        const options = {
            componentRestrictions: { country: "fr" },
            fields: ["address_components", "geometry", "icon", "name"],
            strictBounds: false
        };

        const autocomplete = new window.google.maps.places.Autocomplete(inputLocation.current, options);
        
        window.google.maps.event.addListener(autocomplete, 'place_changed', function() {

            const autocompleteValue = autocomplete.getPlace()

            let location = {}

            const dataFormated = parseAddress(autocompleteValue)
            location = dataFormated

            setCredentials((credential) => {
                console.log("credentials => ",credential);
                return {
                   ...credential,
                    location: location
                }
            })
        });
        inputLocation.current.addEventListener('keydown', (e) => {
            if(e.keyCode == 13){
                e.stopPropagation()
            }
        })
    }
    useEffect(() => {
        addAutoComplete()
        if(isPostForm == true){
            getGeolocation()
        }
    },[])

    useEffect(() => {
        if(geolocation){
            inputLocation.current.value = geolocation.address
        }
    }, [geolocation])

    if(!window.google.maps) return null

    return (
        <TextField
            variant="outlined"
            className="location"
            // label="Localisation"
            name="location"
            inputRef={inputLocation}
            InputLabelProps={{ shrink: geolocation ? true : null }}
            defaultValue={defaultValue()}
        /> 
            
    );
}
 
export default AutoCompleteInput;
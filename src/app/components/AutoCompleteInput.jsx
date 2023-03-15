import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";

const AutoCompleteInput = ({setCredentials}) => {
    const inputLocation = useRef(null);

    function AddAutoComplete() {
        const options = {
            componentRestrictions: { country: "fr" },
            fields: ["address_components", "geometry", "icon", "name"],
            strictBounds: false
        };

        const autocomplete = new window.google.maps.places.Autocomplete(inputLocation.current, options);
        
        window.google.maps.event.addListener(autocomplete, 'place_changed', function() {

            const autocompleteValue = autocomplete.getPlace()
            console.log(autocompleteValue);

            const location = {}

            location.number_address = autocompleteValue.address_components.find((component) => component.types.includes("street_number")).long_name
            location.route = autocompleteValue.address_components.find((component) => component.types.includes("route")).long_name
            location.postal_code = autocompleteValue.address_components.find((component) => component.types.includes("postal_code")).long_name
            location.city = autocompleteValue.address_components.find((component) => component.types.includes("locality")).long_name
            location.country = autocompleteValue.address_components.find((component) => component.types.includes("country")).long_name
            location.administrative_area_level_1 = autocompleteValue.address_components.find((component) => component.types.includes("administrative_area_level_1")).long_name
            location.administrative_area_level_2 = autocompleteValue.address_components.find((component) => component.types.includes("administrative_area_level_2")).long_name
            location.address = `${location.number_address} ${location.route}, ${location.postal_code} ${location.city}, ${location.country}`
            location.lat = autocompleteValue.geometry.location.lat()
            location.lng = autocompleteValue.geometry.location.lng()

            setCredentials((credential) => {
                console.log(credential);
                return {
                    ...credential,
                    location
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
        AddAutoComplete()
    },[])

    return ( 
        <TextField
        variant="outlined"
        className="location"
        label="location"
        name="location"
        inputRef={inputLocation}
        />
    );
}
 
export default AutoCompleteInput;
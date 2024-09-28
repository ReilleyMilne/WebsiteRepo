function initMap() {
    //Intializes map.
    const center = {lat: 47.6740, lng: -122.1215};
    const radius = 100000;

    const options = {
        center: center,
        zoom: 10,
    }

    const map = new google.maps.Map(document.getElementById("map"), options);

    //Intializes autocomplete.
    const start_autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('start-address'),
        {
            location: center,
            radius: radius,
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["place_id", "name", "types", "address_components", "geometry", "adr_address"],
        }
    );
    start_autocomplete.addListener('place_changed', function () {
        const place = start-autocomplete.getPlace();
        if (!place.geometry) {
            document.getElementById('start-address').placeholder = 'Enter a starting location';
        } else {
            document.getElementById('details').innerHTML = place.name;
        }
    });
    const end_autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('end-address'),
        {
            location: center,
            radius: radius,
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["place_id", "name", "types", "address_components", "geometry", "adr_address"],
        }
    );
    end_autocomplete.addListener('place_changed', function () {
        const place = end_autocomplete.getPlace();
        if (!place.geometry) {
            document.getElementById('end-address').placeholder = 'Enter a starting location';
        } else {
            document.getElementById('details').innerHTML = place.name;
        }
    });
}
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Locate, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface MapLocationProps {
    latitude?: string;
    longitude?: string;
    landmark: string;
    onLocationChange?: (location: { latitude: string; longitude: string }) => void;
    onAddressChange?: (address: { street: string; city: string; state: string; zipCode: string }) => void;
    onLandmarkChange?: (landmark: string) => void;
}

const MapLocation: React.FC<MapLocationProps> = ({
    latitude = '20.5937',
    longitude = '78.9629',
    landmark = '',
    onLocationChange,
    onAddressChange,
    onLandmarkChange,
}) => {
    const [currentLat, setCurrentLat] = useState(latitude);
    const [currentLng, setCurrentLng] = useState(longitude);
    const [isLoading, setIsLoading] = useState(false);
    const [zoom, setZoom] = useState(5);

    const [landmarkInput, setLandmark] = useState(landmark);

    const handleChange = (value: string) => {
        setLandmark(value);
        onLandmarkChange?.(value);
    };

    useEffect(() => {
        setCurrentLat(latitude);
        setCurrentLng(longitude);
        updateMapLocation(latitude, longitude);
        // eslint-disable-next-line
    }, [latitude, longitude]);

    const updateMapLocation = (lat: string, lng: string) => {
        const iframe = document.getElementById('map-iframe') as HTMLIFrameElement;
        if (iframe && lat && lng) {
            iframe.src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
        }
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toString();
                    const lng = position.coords.longitude.toString();
                    setCurrentLat(lat);
                    setCurrentLng(lng);
                    setZoom(16);
                    updateMapLocation(lat, lng);
                    onLocationChange?.({ latitude: lat, longitude: lng });
                    reverseGeocode(lat, lng);
                    setIsLoading(false);
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    toast.error("Unable to get your current location. Please check your browser permissions.");
                    setIsLoading(false);
                }
            );
        } else {
            toast.error("Geolocation is not supported by your browser.");
        }
    };

    const reverseGeocode = (lat: string, lng: string) => {
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
        fetch(geocodingUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === "OK" && data.results && data.results.length > 0) {
                    const address = data.results[0];
                    const addressComponents = { street: '', city: '', state: '', zipCode: '' };

                    // Extract address components
                    address.address_components.forEach((component: any) => {
                        const types = component.types;
                        if (types.includes('route')) addressComponents.street = component.long_name;
                        else if (types.includes('locality')) addressComponents.city = component.long_name;
                        else if (types.includes('administrative_area_level_1')) addressComponents.state = component.long_name;
                        else if (types.includes('postal_code')) addressComponents.zipCode = component.long_name;
                    });

                    // If street is empty, use the first part of formatted address
                    if (!addressComponents.street && address.formatted_address) {
                        const formattedParts = address.formatted_address.split(',');
                        if (formattedParts.length > 0) addressComponents.street = formattedParts[0];
                    }

                    // Update address
                    onAddressChange?.(addressComponents);
                    console.log(addressComponents);

                    // Find a suitable landmark
                    let landmarkName = '';
                    
                    // First try to find a point of interest
                    const poi = data.results.find((result: any) =>
                        result.types.some((type: string) =>
                            ['point_of_interest', 'establishment', 'premise'].includes(type)
                        )
                    );
                    
                    if (poi && poi.name) {
                        landmarkName = poi.name;
                    } else {
                        // If no POI found, use the locality or neighborhood
                        const locality = address.address_components.find((component: any) =>
                            component.types.includes('locality')
                        );
                        if (locality) {
                            landmarkName = locality.long_name;
                        } else {
                            // If no locality, use the first part of the formatted address
                            landmarkName = address.formatted_address.split(',')[0];
                        }
                    }

                    // Update landmark
                    if (landmarkName && onLandmarkChange) {
                        onLandmarkChange(landmarkName);
                    }

                    toast.success("Location details updated successfully");
                }
            })
            .catch(error => {
                console.error("Error during reverse geocoding:", error);
                toast.error("Failed to get address details. Please try again.");
            });
    };

    const openLocationPicker = () => {
        window.open(`https://www.google.com/maps/@${currentLat},${currentLng},18z`, '_blank');
        toast.info("After selecting a location in Google Maps, please manually input the coordinates here.");
    };

    const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCurrentLat(value);
        if (value && currentLng) {
            setZoom(16);
        } else {
            setZoom(5);
        }
        onLocationChange?.({ latitude: value, longitude: currentLng });
    };

    const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCurrentLng(value);
        if (currentLat && value) {
            setZoom(16);
        } else {
            setZoom(5);
        }
        onLocationChange?.({ latitude: currentLat, longitude: value });
    };

    return (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
            </div>
            <div className="bg-white p-6 rounded-lg space-y-6">
                <div>
                    <h4 className="text-lg font-medium mb-4 text-black">Map Location</h4>
                    <p className="text-sm text-gray-500 mb-4">
                        Use the map below to set your property's location. Click on the map or search for an address.
                    </p>
                    <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative mb-6">
                    <iframe
                      id="map-iframe"
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${currentLng || '78.9629'}!3d${currentLat || '20.5937'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${currentLat || '20.5937'},${currentLng || '78.9629'}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl"
                      title="Property Location Map"
                    ></iframe>
                        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                            <button
                                onClick={getCurrentLocation}
                                className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                                aria-label="Get current location"
                                type="button"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                                ) : (
                                    <Locate className="w-5 h-5 text-blue-600" />
                                )}
                                <span className="text-sm font-medium">My Location</span>
                            </button>
                            <button
                                onClick={openLocationPicker}
                                className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                                aria-label="Select location"
                                type="button"
                            >
                                <Navigation className="w-5 h-5 text-blue-600" />
                                <span className="text-sm font-medium">Select Location</span>
                            </button>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-white bg-opacity-75 px-2 py-1 rounded text-xs text-gray-600">
                            Powered by Google Maps
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-medium mb-4 text-black">Coordinates</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="latitude" className="block text-gray-800 font-medium mb-2">
                                Latitude
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="latitude"
                                    value={currentLat}
                                    onChange={handleLatitudeChange}
                                    placeholder="Enter latitude (e.g., 17.683301)"
                                    className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                                />
                                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="longitude" className="block text-gray-800 font-medium mb-2">
                                Longitude
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="longitude"
                                    value={currentLng}
                                    onChange={handleLongitudeChange}
                                    placeholder="Enter longitude (e.g., 83.019301)"
                                    className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                                />
                                <Navigation className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                        Enter coordinates manually or use the map above to set the location.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-medium mb-4 text-black">Landmark</h4>
                    <div className="relative">
                        <input
                            type="text"
                            value={landmarkInput}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder="Enter nearby landmark"
                            className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                        />
                        <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapLocation;

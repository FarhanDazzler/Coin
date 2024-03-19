import { useState, useEffect } from 'react';
import { publicIpv4 } from 'public-ip';

const useIPandGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
    error: null,
  });
  const [ipAddress, setIpAddress] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        publicIpv4()
          .then((ip) => {
            setIpAddress(ip);
          })
          .catch((error) => {
            setIpAddress(`Failed to fetch IP ${error}`);
          });
      } catch (error) {
        setIpAddress(`Failed to fetch IP ${error}`);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const onSuccess = (location) => {
      const { latitude, longitude } = location.coords;
      setLocation({
        loaded: true,
        coordinates: { lat: latitude, lng: longitude },
        error: null,
      });
    };

    const onError = (error) => {
      setLocation({
        loaded: true,
        coordinates: { lat: '', lng: '' },
        error: {
          code: error.code,
          message: error.message,
        },
      });
    };

    if ('geolocation' in navigator) {
      const geoWatchId = navigator.geolocation.watchPosition(onSuccess, onError);
      return () => navigator.geolocation.clearWatch(geoWatchId);
    } else {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }
  }, []);

  return { ipAddress, location };
};

export default useIPandGeoLocation;

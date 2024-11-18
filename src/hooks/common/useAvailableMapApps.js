import LaunchNavigator from 'react-native-launch-navigator';

const useAvailableMapApps = () => {
  const mapArr = [];
  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.GOOGLE_MAPS).then((isGMapAvailable) => {
    console.log('isGMapAvailable', isGMapAvailable);

    if (isGMapAvailable) {
      const mapObject = { uriScheme: 'GOOGLE_MAPS', title: 'open in Google Maps' };
      mapArr.push(mapObject);
      console.log('Google Map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.APPLE_MAPS).then((isAppleMapAvailable) => {
    if (isAppleMapAvailable) {
      const mapObject = { uriScheme: 'APPLE_MAPS', title: 'open in Apple Maps' };
      mapArr.push(mapObject);
      console.log('Apple Map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.CITYMAPPER).then((isCityMapperAvailable) => {
    if (isCityMapperAvailable) {
      const mapObject = { uriScheme: 'CITYMAPPER', title: 'open in Citymapper' };
      mapArr.push(mapObject);
      console.log('CityMapper map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.WAZE).then((isWazeAvailable) => {
    if (isWazeAvailable) {
      const mapObject = { uriScheme: 'WAZE', title: 'open in Waze Maps' };
      mapArr.push(mapObject);
      console.log('Waze map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.NAVIGON).then((isNavigonAvailable) => {
    if (isNavigonAvailable) {
      const mapObject = { uriScheme: 'NAVIGON', title: 'open in Navigon Maps' };
      mapArr.push(mapObject);
      console.log('Navigon map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.TRANSIT_APP).then((isTransitAvailable) => {
    if (isTransitAvailable) {
      const mapObject = { uriScheme: 'TRANSIT_APP', title: 'open in Transit Maps' };
      mapArr.push(mapObject);
      console.log('Transit map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.YANDEX).then((isYandexAvailable) => {
    if (isYandexAvailable) {
      const mapObject = { uriScheme: 'YANDEX', title: 'open in Yandex Maps' };
      mapArr.push(mapObject);
      console.log('Yandex map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.TOMTOM).then((isTomTomAvailable) => {
    if (isTomTomAvailable) {
      const mapObject = { uriScheme: 'TOMTOM', title: 'open in TomTom Maps' };
      mapArr.push(mapObject);
      console.log('TomTom map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.SYGIC).then((isSygicAvailable) => {
    if (isSygicAvailable) {
      const mapObject = { uriScheme: 'SYGIC', title: 'open in Sygic Maps' };
      mapArr.push(mapObject);
      console.log('Sygic map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.HERE_MAPS).then((isHereMapAvailable) => {
    if (isHereMapAvailable) {
      const mapObject = { uriScheme: 'HERE_MAPS', title: 'open in HereMap Maps' };
      mapArr.push(mapObject);
      console.log('HereMap map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.MOOVIT).then((isMoovitAvailable) => {
    if (isMoovitAvailable) {
      const mapObject = { uriScheme: 'MOOVIT', title: 'open in Moovit Maps' };
      mapArr.push(mapObject);
      console.log('Moovit map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.MAPS_ME).then((isMapsMeAvailable) => {
    if (isMapsMeAvailable) {
      const mapObject = { uriScheme: 'MAPS_ME', title: 'open in MapsMe Maps' };
      mapArr.push(mapObject);
      console.log('MapsMe map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.CABIFY).then((isCabifyAvailable) => {
    if (isCabifyAvailable) {
      const mapObject = { uriScheme: 'CABIFY', title: 'open in Cabify Maps' };
      mapArr.push(mapObject);
      console.log('Cabify map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.BAIDU).then((isBaiduAvailable) => {
    if (isBaiduAvailable) {
      const mapObject = { uriScheme: 'BAIDU', title: 'open in Baidu Maps' };
      mapArr.push(mapObject);
      console.log('Baidu map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.TAXIS_99).then((isTaxis99Available) => {
    if (isTaxis99Available) {
      const mapObject = { uriScheme: 'TAXIS_99', title: 'open in Taxis_99 Maps' };
      mapArr.push(mapObject);
      console.log('Taxis_99 map is available');
    }
  });

  LaunchNavigator.isAppAvailable(LaunchNavigator.APP.GAODE).then((isGaodeAvailable) => {
    if (isGaodeAvailable) {
      const mapObject = { uriScheme: 'GAODE', title: 'open in Gaode Maps' };
      mapArr.push(mapObject);
      console.log('Gaode map is available');
    }
  });
  console.log('mapArrmapArr', mapArr);
  return mapArr;
};

export default useAvailableMapApps;

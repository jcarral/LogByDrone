import DJIParser from 'dji-log-parser';

export class Parser {
  static parse = (log) => new Promise((resolve, reject) => {
    if (log.type !== 'text/plain') return reject('Not file type');
    
    const reader = new FileReader();

    //frames
    const infos = {};
    const frames = [];
    let currentFlyTime;
    let currentFrame;
    
    reader.onload = () => {
      const parser = new DJIParser();

      parser.on('DETAILS', (obj) => {
        infos.subStreet = ''; // obj.getSubStreet();
        infos.street = obj.getStreet();
        infos.city = obj.getCity();
        infos.area = obj.getArea();
        infos.longitude = obj.getLongitude();
        infos.latitude = obj.getLatitude();
        infos.totalDistance = obj.getTotalDistance();
        infos.totalTime = obj.getTotalTime();
        infos.maxHeight = obj.getMaxHeight();
        infos.maxHSpeed = obj.getMaxHSpeed();
        infos.maxVSpeed = obj.getMaxVSpeed();
        infos.updateTime = obj.getUpdateTime();
        infos.aircraftName = ''; // obj.getAircraftName();
      });

      parser.on('RECOVER', (obj) => {
        infos.droneType = obj.getDroneType();
        infos.appType = obj.getAppType();
        infos.appVersion = obj.getAppVersion();
      });

      parser.on('OSD', (obj) => {
        console.log('osf')
        infos.longitude = obj.getLongitude();
        infos.latitude = obj.getLatitude();
        infos.height = obj.getHeight();
        infos.XspeedX = obj.getXSpeed();
        infos.Yspeed = obj.getYSpeed();
        infos.Zspeed = obj.getZSpeed();
        infos.pitch = obj.getPitch();
        infos.roll = obj.getRoll();
        infos.yaw = obj.getYaw();
        infos.gpsNum = obj.getGpsNum();
        infos.flycState = obj.getFlycState();
      });

      parser.parse(reader.result);
    };

    reader.onloadend = () => {
      return resolve(infos);
    }
    reader.readAsArrayBuffer(log);
  });
};

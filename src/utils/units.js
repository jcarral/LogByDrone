export class Units {
  static date = value => new Date(value).toString();

  static speed = (value, imperial = false, unit = true) => {
    const rounded = imperial
      ? Math.round(value * 32.8084) / 10
      : Math.round(value * 10) / 10;
    return unit ? `${rounded} ${imperial ? 'ft/s' : 'm/s'}` : rounded;
  };

  static timedelta = (value) => {
    const minutes = Math.floor(value / 1000 / 60);
    const seconds = Math.round((value / 1000) - (minutes * 60));
    return `${minutes}m ${seconds}s`;
  };
};

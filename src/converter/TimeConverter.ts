class TimeConverter {
  private diffMilliSeconds: number = 0;
  private convertMinutes: number = 0;

  constructor(time: Date | string) {
    this.diffMilliSeconds = Date.now() - new Date(time).getTime();
  }
  
  public milliSecondsToMinutes(): number {
    this.convertMinutes = Math.floor(this.diffMilliSeconds / 1000 / 60);
    return this.convertMinutes;
  }

  public milliSecondsToHour(): number {
    return Math.floor(this.convertMinutes / 60);
  }

  public milliSecondsToDate(): number {
    return Math.floor(this.convertMinutes / 60 / 24);
  }

  public milliSecondsToMonth(): number {
    return Math.floor(this.convertMinutes / 60 / 24 / 30);
  }
}

export default TimeConverter;
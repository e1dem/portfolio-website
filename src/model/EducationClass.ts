class EducationClass {
  title: string;
  classType: string;
  online: boolean;
  startDate: Date;
  endDate?: Date;
  teacher: string;
  place: string;
  location?: string;

  constructor(title: string,  classType: string, online: boolean, startDate: Date, teacher: string, place: string, location?: string, endDate?: Date) {
    this.title = title;
    this.classType = classType;
    this.online = online;
    this.startDate = startDate;
    this.endDate = endDate;
    this.teacher = teacher;
    this.place = place;
    this.location = location;
  }
}

export default EducationClass;
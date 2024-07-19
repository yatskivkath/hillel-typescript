class Lecturer {
  _name: string;
  _surname: string;
  _position: string;
  _company: string;
  _experience: number;
  _courses: string[];
  _contacts: string[];

  get name(): string {
    return this._name;
  }

  get surname(): string {
    return this.surname;
  }

  constructor(
    name: string,
    surname: string,
    position: string,
    company: string,
    experience: number,
    courses: string[],
    contacts: string[]
  ) {
    this._name = name;
    this._surname = surname;
    this._position = position;
    this._company = company;
    this._experience = experience;
    this._courses = courses;
    this._contacts = contacts;
  }
}

class School {
  _areas: Area[] = [];
  _lecturers: Lecturer[] = [];

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(area: Area): void {
    this._areas = this._areas.filter((a: Area) => a.name !== area.name);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removelecturer(lecturer: Lecturer): void {
    this._lecturers = this.lecturers.filter(
      (l: Lecturer) => !(l._name === lecturer.name && l.surname === lecturer.surname)
    );
  }
}

class Area {
  _levels: Level[] = [];
  _name: string;

  get name(): string {
    return this._name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  constructor(name: string) {
    this._name = name;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(level: Level): void {
    this._levels = this._levels.filter((l: Level) => l.name !== level.name);
  }
}

class Level {
  _groups: Group[] = [];
  _name: string;
  _description: string;

  get groups(): Group[] {
    return this._groups;
  }

  get name(): string {
    return this._name;
  }

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(group: Group): void {
    this._groups = this._groups.filter((g: Group) => !(g.area === group.area && g.status === group.status));
  }
}

class Group {
  _area: Area;
  _level: Level;
  _status: string;
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*

  get area(): Area {
    return this._area;
  }

  get status(): string {
    return this._status;
  }

  set status(status: string) {
    this._status = this.status;
  }

  constructor(area: Area, level: Level, status: string) {
    this._area = area;
    this._level = level;
    this._status = status;
  }

  showPerformance(): Student[] {
    const sortedStudents = this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    return sortedStudents;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(student: Student): void {
    this._students = this._students.filter(
      (s: Student) => !(s.firstName === student.firstName && s.lastName === student.lastName)
    );
  }
}

enum Subjects {
  Math = 0,
  Physics = 1,
  PE = 2,
}

const MAX_SUBJECTS = 3;

type Grade = [string, number];

class Student {
  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: Grade[] = []; // workName: mark
  _visits: boolean[] = []; // lesson: present

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get birthYear(): number {
    return this._birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = this._grades.map((grade: Grade) => grade[1]);

    if (!gradeValues.length) return 0;

    const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage = (this._visits.filter(present => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }

  addGrade(grade: Grade): void {
    const [workName, mark] = grade;
    this._grades.push([workName, mark]);
  }

  addVisit(subject: Subjects, visit: boolean): void {
    this._visits[subject] = visit;
  }
}

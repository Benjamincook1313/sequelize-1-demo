import { DataTypes, Model } from 'sequelize';
import connectToDB from './db.js';
import url from "url";
import util from "util";

// ----------------------------- vv URI vv--------------------
const db = await connectToDB('postgresql:///company');

// table name Departments
class Departments extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
};
// columns
// deptCode: varchar 5, primary key
// deptName: varchar, not null, unique
// phone: varchar, allow null

// CREATE TABLE department (
// dept_code VARCHAR(5) PRIMARY KEY,
// dept_name VARCHAR NOT NULL UNIQUE,
// phone VARCHAR
// );

Departments.init({
  deptCode: {
    type: DataTypes.STRING(5),
    primaryKey: true,
  },
  deptName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING
  }
},{
  modelName: "department",
  sequelize: db
});

class Employee extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
};
// id: int serial primary key
// name: varchar, unique, not null
// state: varchar 2, not null, default value = "CA"
// salary: int
// deptCode: varchar 5
// model name employee
Employee.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(2),
    allowNull: false,
    defaultValue: "CA"
  },
  salary: {
    type: DataTypes.INTEGER,
  },
  // deptCode: {
  //   type: DataTypes.STRING(5)
  // },
},{
  modelName: "employee",
  sequelize: db
});

// ESTABLISHES CONNECTION AND CREATES "deptCode" COLUMN ON THE EMPLOYEE TABLE
Departments.hasMany(Employee, { foreignKey: "deptCode"});
Employee.belongsTo(Departments, { foreignKey: "deptCode"});

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log('Syncing database...');
  await db.sync({force: true});
  console.log('Finished syncing database!');
}

export { Departments, Employee };

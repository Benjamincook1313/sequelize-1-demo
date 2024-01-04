import { Departments, Employee } from "./models.js";
import { Op } from "sequelize";
// const { Departments, Employee } = await import("./models.js");

const legal = await Departments.create({
  deptCode: "legal",
  deptName: "Legal",
  phone: "555-1234",
});

const leonard = await Employee.create({
  name: "leonard",
  deptCode: "legal",
  salary: 60000
});

leonard.name = "Leonard";
leonard.save();

console.log(legal);
// console.log(leonard);

const emps = await Employee.findAll();

const emp2 = await Employee.findByPk(2);

// WHERE 
const development = await Departments.findAll({
  where: {deptCode: "dev"}
});
// AND 
await Employee.findAll({
  where: { deptCode: 'legal', salary: 100000 }
});

// UPDATE
await Employee.update({
  name: "Jared",
  salary: 100000
},{
  where: {id: 2}
});

// OR
await Employee.findAll({
  where: {
    [Op.or]: [
      { salary: { [Op.gte]: 100000 }},
      { deptCode: { [Op.is]: null }}
    ]
  }
});
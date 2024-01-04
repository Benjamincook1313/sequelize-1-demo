import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgresql:///company");

sequelize.query(`
  INSERT INTO employees (name, state)
  VALUES ('Benjamin', 'UT');
`);
import { Sequelize } from "sequelize";

async function connectToDB(dbURI){
  console.log('Connecting to DB');

  const sequelize = new Sequelize(dbURI, {
    logging: console.log,
    define: {
      timestamps: false,
      underscored: true
    }
  });

  try {
    await sequelize.authenticate();
    console.log('Successfully connected to DB');
  } catch(err){
    console.log('Unable to connect', err);
  }

  return sequelize;
}

export default connectToDB;
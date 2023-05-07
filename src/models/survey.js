import { Sequelize } from "sequelize";

export default (sequelize, DataTypes) => {
  return sequelize.define("survey", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      comment: "설문지 고유 식별값",
      primaryKey: true,
    },
    ci: {
      type: DataTypes.STRING(64),
      comment: "유저 고유 식별값",
    },
    surveyForm: {
      type: DataTypes.JSON(),
      allowNull: false,
      comment: "유저 설문지 폼",
    },
  });
};

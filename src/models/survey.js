export default (sequelize, DataTypes) => {
  return sequelize.define("survey", {
    ci: {
      type: DataTypes.STRING(64),
      primaryKey: true,
      comment: "유저 고유 식별값",
    },
    surveyForm: {
      type: DataTypes.JSON(),
      allowNull: false,
      comment: "유저 설문지 폼",
    },
  });
};

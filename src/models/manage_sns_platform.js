export default (sequelize, DataTypes) => {
  return sequelize.define(
    "manage_sns_platform",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: "SNS 플랫폼",
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
    }
  );
};

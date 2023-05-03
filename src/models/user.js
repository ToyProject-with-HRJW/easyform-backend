export default (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      ci: {
        type: DataTypes.STRING(64),
        primaryKey: true,
        comment: "유저 고유 식별값",
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: "유저 이메일",
      },
      nickName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: "유저 닉네임",
      },
      icon: {
        type: DataTypes.STRING(512),
        comment: "유저 아이콘",
      },
      platformId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: "첫 회원가입시 사용한 SNS 플랫폼",
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["email", "platformId"],
        },
        {
          unique: true,
          fields: ["nickName"],
        },
      ],
    }
  );
};

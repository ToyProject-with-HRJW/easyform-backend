export default (sequelize, DataTypes) => {
    return sequelize.define('users', {
        ci : {
            type: DataTypes.STRING(64),
            primaryKey: true,
            comment: "유저 고유 식별값",
        },
        email: {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "유저 이메일",
        },
        nickname: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: "유저 닉네임",
        },
        icon: {
            type: DataTypes.STRING(512),
            allowNull: true,
            comment: "유저 아이콘",
        },
        signupPlatform: {
            type: DataTypes.STRING(32),
            allowNull: false,
            comment: "유저정보 리소스 제공 플랫폼",
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['email', 'signupPlatform']
            }
        ]
    });
}
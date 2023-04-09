export default function associationAll(db) {
  db.users.hasMany(db.manage_sns_platform, {
    as: "users_sns_platform",
    sourceKey: "platformId",
    foreignKey: "id",
  });

  db.manage_sns_platform.hasMany(db.users, {
    as: "sns_platform_users",
    sourceKey: "id",
    foreignKey: "platformId",
  });
}

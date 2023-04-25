export default function associationAll(db) {
  db.users.belongsTo(db.manage_sns_platform, {
    foreignKey: "platformId",
  });

  db.manage_sns_platform.hasOne(db.users, {
    foreignKey: "platformId",
  });
}

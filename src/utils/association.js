export default function associationAll(db) {
  db.user.belongsTo(db.manage_sns_platform, {
    foreignKey: "platformId",
  });

  db.manage_sns_platform.hasOne(db.user, {
    foreignKey: "platformId",
  });

  db.survey.belongsTo(db.user, {
    foreignKey: "ci",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.user.hasMany(db.survey, {
    foreignKey: "ci",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
}

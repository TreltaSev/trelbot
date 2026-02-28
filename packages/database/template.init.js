// --- FULL SERVER ADMIN ---
db = db.getSiblingDB("admin");

db.createUser({
  user: "{username}",
  pwd: "{password}",
  roles: [{ role: "root", db: "admin" }],
});
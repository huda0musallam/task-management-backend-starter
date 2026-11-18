const users = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com" },
  { id: 2, name: "Grace Hopper", email: "grace@example.com" }
];

export function getAllUsers() {
  return [...users];
}

export function getUserById(id) {
  return users.find((user) => user.id === Number(id)) ?? null;
}

import bcrypt from "bcryptjs";

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

async function verifyPassword(password, hash) {
  const verify = await bcrypt.compare(password, hash);

  return verify;
}

export default { hashPassword, verifyPassword };

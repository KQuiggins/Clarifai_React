import bcrypt from "bcrypt";

async function testBcrypt() {
  const plaintextPassword = "123456";
  const hashedPassword = await bcrypt.hash(plaintextPassword, 10);

  console.log("Hashed password:", hashedPassword);

  const isMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
  console.log("Password match:", isMatch);
}

testBcrypt();

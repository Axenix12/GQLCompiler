import jwt from 'jsonwebtoken';

async function keyCloak() {
  const temporaryCACNumber = '1234567890';

  // if user signed in:
  const testjson = {
    Roles: {
      SignedIn: 'False',
      CACNumber: temporaryCACNumber
    }
  };
  const expiresIn = '365d'; // 365 days
  const token = jwt.sign(testjson, process.env.JWT_SECRET, { expiresIn });
  // console.log(token);
  // code for generating a signed JWT token with a predetermined cacnumber
  return token;
}

export { keyCloak };

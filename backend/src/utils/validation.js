
import validator from 'validator';

const validation = (req) => {
  const {firstName, lastName, businessName, emailId, password} = req.body;

  if(!firstName || !lastName || !businessName || !emailId || !password) {
    throw new Error("Required data missing!");
  }

  if(!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  }

  if(!validator.isStrongPassword(password)) {
    throw new Error("Give strong password");
  }
}

export default validation;
import jwt from 'jsonwebtoken';

const tokenGeneration = (userId, email) => {
  const token = jwt.sign(
    { userId, email }, 
    process.env.JWT_SECRET, 
  );

  return token;
};

export default tokenGeneration;

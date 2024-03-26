const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regStrongpassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

export { regEmail, regStrongpassword };

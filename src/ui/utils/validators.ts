const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(email: string, password: string) {
  const errors: { email?: string; password?: string } = {};
  const e = email.trim();

  if (!e) errors.email = 'Please enter your email.';
  else if (!emailRegex.test(e)) errors.email = 'Incorrect email format.';

  if (!password) errors.password = 'Please enter your password.';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';

  return errors;
}

export function validateSignup(name: string, email: string, password: string) {
  const errors: { name?: string; email?: string; password?: string } = {};
  const n = name.trim();
  const e = email.trim();

  if (!n) errors.name = 'Please fill your name.';

  if (!e) errors.email = 'Please write your email.';
  else if (!emailRegex.test(e)) errors.email = 'Incorrect email format.';

  if (!password) errors.password = 'Please create a password.';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';

  return errors;
}

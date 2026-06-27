export async function login(
  email: string,
  password: string
) {
  console.log({
    email,
    password,
  });

  return {
    accessToken: "temporary",
  };
}
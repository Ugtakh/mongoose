const NextAuth = require("next-auth");
const Providers = require("next-auth/providers");

const providers = [
  Providers.Github({
    clientId: "16a792488fa72c8e141d",
    clientSecret: "6a17ede622a3bf4ce16727326f0d7a16748db6c0",
  }),
];

const callbacks = {};

callbacks.signIn = async function signin(user, account, metadata) {
  if (account.provider === "github") {
    const githubUser = {
      id: metadata.id,
      login: metadata.login,
      name: metadata.name,
      avatar: user.image,
    };
    user.accessToken = await getTokenFromYourAPIServer("github", githubUser);
    return true;
  }
  return false;
};

callbacks.jwt = async function jwt(token, user) {
  if (user) {
    token = { accessToken: user.accessToken };
  }

  return token;
};

callbacks.session = async function session(session, token) {
  session.accessToken = token.accessToken;
  return session;
};

const options = {
  providers,
  callbacks,
};

export default (req, res) => NextAuth(req, res, options);

export const routes: { [key: string]: RegExp } = {
  getusers: /^(\/api\/users)$/,
  getuser: /^(\/api\/users)\/[0-9a-z-]+$/,
  postuser: /^(\/api\/users)$/,
  changeuser: /^(\/api\/users)\/[0-9a-z-]+$/,
  deluser: /^(\/api\/users)\/[0-9a-z-]+$/,
};

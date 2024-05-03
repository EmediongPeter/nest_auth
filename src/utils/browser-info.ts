export const getBrowserInfo = (request): string => {
  const browserInfo =
    `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(
      / undefined/g,
      '',
    );

  return browserInfo;
};

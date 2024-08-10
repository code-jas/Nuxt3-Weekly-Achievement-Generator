export const googleCredentials = (config: any) => {
  return {
    credentials: {
      type: config.public.googleType,
      project_id: config.public.googleProjectId,
      private_key_id: config.public.googlePrivateKeyId,
      private_key: config.public.googlePrivateKey.replace(/\\n/g, '\n'),
      client_email: config.public.googleClientEmail,
      client_id: config.public.googleClientId,
      auth_uri: config.public.googleAuthUri,
      token_uri: config.public.googleTokenUri,
      auth_provider_x509_cert_url: config.public.googleAuthProviderCertUrl,
      client_x509_cert_url: config.public.googleClientCertUrl,
      universe_domain: config.public.googleUniverseDomain,
    },
    scopes: config.public.googleScopes.split(','),
  };
};

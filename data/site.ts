const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
let siteUrl = 'https://localhost:3000';

if (configuredUrl) {
  try {
    const parsedUrl = new URL(configuredUrl);
    parsedUrl.protocol = 'https:';
    siteUrl = parsedUrl.origin;
  } catch {
    // Keep local metadata usable; production deployments should set NEXT_PUBLIC_SITE_URL.
  }
}

export const site = {
  name: 'Rohan Magar',
  url: siteUrl,
  description:
    'Rohan Magar builds modern websites, web applications and software, with interests in AI, data science and healthcare technology.',
} as const;

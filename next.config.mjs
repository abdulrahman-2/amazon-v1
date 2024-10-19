/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.dummyjson.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

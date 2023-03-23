/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "https://my-toy-001.web.app", // 배포 경로
  },
};

module.exports = nextConfig;

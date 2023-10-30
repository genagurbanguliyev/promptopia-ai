/** @type {import('next').NextConfig} */
const nextConfig = {
  //   experimental: {
  //     serverComponentsExternalPackages: ["prisma"],
  //   },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  //   webpack(config) {
  //     config.experiments = {
  //       ...config.experiments,
  //       topLevelAwait: true,
  //     };
  //     return config;
  //   },
};

module.exports = nextConfig;

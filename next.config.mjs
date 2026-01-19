const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ayush-nextjs-food-app.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // or "5mb"
    },
  },
};

export default nextConfig;
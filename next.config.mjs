/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
         remotePatterns: [
      {
        protocol: 'https',
        hostname: 'medorahcdc.com',
      },
      {
        protocol: 'https',
        hostname: '43.204.221.149',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
}
};
export default nextConfig;

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

    ],
}
};
export default nextConfig;

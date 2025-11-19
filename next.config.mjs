// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: [
//             'medorahcdc.com', 
//             'www.medorahcdc.com', 
//             'localhost'
//         ],
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'www.medorahcdc.com',
//                 pathname: '/uploads/**'
//             }
//         ]
//     }
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "medorahcdc.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.medorahcdc.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      }
    ]
  },
  // Handle chunk loading errors gracefully
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Generate stable chunk names in production
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
      };
    }
    return config;
  },
};

export default nextConfig;

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
      }
    ]
  }
};

export default nextConfig;

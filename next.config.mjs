/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'medorahcdc.com', 
            'www.medorahcdc.com', 
            'localhost'
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.medorahcdc.com',
                pathname: '/uploads/**'
            }
        ]
    }
};

export default nextConfig;

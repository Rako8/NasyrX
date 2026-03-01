/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '8f08a8-hoss.akinoncloudcdn.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
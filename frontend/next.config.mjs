/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"skillhat.ca",
                port:"",
                pathname:"/**"
            },
        ]
    }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', '*.ngrok-free.app', 'apiemmafitness.delavendervipspa.shop', "emmafitness-server.onrender.com", 'admin.emmafitness.ae', 'emmafitnessphotos.s3.ap-southeast-1.amazonaws.com', 'emmafitness.ae'],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'apiemmafitness.delavendervipspa.shop',
        },],
        unoptimized:true
    },

}

module.exports = nextConfig

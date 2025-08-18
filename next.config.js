/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', '*.ngrok-free.app', '13.229.109.96:5000', "emmafitness-server.onrender.com", 'admin.emmafitness.ae', 'emmafitnessphotos.s3.ap-southeast-1.amazonaws.com', 'emmafitness.ae'],
        remotePatterns: [{
            protocol: 'http',
            hostname: '13.229.109.96',
            port: '5000'
        },]
    },

}

module.exports = nextConfig

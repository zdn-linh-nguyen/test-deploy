/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["res.cloudinary.com", "asset.cloudinary.com", "example.com"],
	},
	env: {
		MAX_IMAGES_ALBUMS: process.env.MAX_IMAGES_ALBUMS,
	},
};

module.exports = nextConfig;

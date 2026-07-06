import type { NextConfig } from "next";

const nextConfig = {
  allowedDevOrigins: [
    "192.168.10.130",
    "192.168.137.1",
    "192.168.10.130:3000",
    "192.168.137.1:3000",
    "localhost:3000"
  ]
} as any;

export default nextConfig as NextConfig;

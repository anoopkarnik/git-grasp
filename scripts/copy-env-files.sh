cp docker/.env.example.nextjs-app apps/nextjs-app/.env

cp docker/.env.example.specific.nextjs-app apps/nextjs-app/.env.local
cp docker/.env.example.specific.nextjs-app apps/nextjs-app/.env.development
cp docker/.env.example.specific.nextjs-app apps/nextjs-app/.env.production

cp docker/.env.example.prisma-db packages/prisma-db/.env
cp docker/.env.example.prisma-db packages/prisma-db/.env.local
cp docker/.env.example.prisma-db packages/prisma-db/.env.development
cp docker/.env.example.prisma-db packages/prisma-db/.env.production
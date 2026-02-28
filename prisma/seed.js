const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const products = [
        {
            name: "Velvet Loafer",
            price: 450,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFSMxA7p0NfEihqeCulc1iItWA0T79EubfSVPP50aOMQ8QUdLpQNwlCiYoOAIvlEsJ9etMXDs8PZArcKq9ovCd5fZcJdlz_FikmIdHA1_a6s65QyH8cGFwt7yNOaAgcixhWiRQckypqF1vfLIsHsU49-Yb1baatiL00LB3cDPFGat5oArA_fWl1sS8oKy89wqL5b57XUvI0k-JTsI7wkbHjBdg9tDg2WOuXa_TGJql79pE56-a9DHcef7j_fA_Z_7Zl9nFDW4qttc",
            description: "Classic silhouette, modern comfort.",
            category: "Shoes",
            stockLevel: 10,
            sizes: JSON.stringify(["7", "8", "9", "10", "11"]),
            images: JSON.stringify(["https://lh3.googleusercontent.com/aida-public/AB6AXuDFSMxA7p0NfEihqeCulc1iItWA0T79EubfSVPP50aOMQ8QUdLpQNwlCiYoOAIvlEsJ9etMXDs8PZArcKq9ovCd5fZcJdlz_FikmIdHA1_a6s65QyH8cGFwt7yNOaAgcixhWiRQckypqF1vfLIsHsU49-Yb1baatiL00LB3cDPFGat5oArA_fWl1sS8oKy89wqL5b57XUvI0k-JTsI7wkbHjBdg9tDg2WOuXa_TGJql79pE56-a9DHcef7j_fA_Z_7Zl9nFDW4qttc"]),
        },
        {
            name: "Suede Runner",
            price: 320,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi5DMssAX3z6iHKTNsShUlPxF16zUZeK7C8PYUTF9lPNEr2ViG5MKr87G5mcti9liEeICGUy5oiUyKFsCMB_RxIUsU1uluv-4ng2DWwIJPGebPDT0qMScQOvKb0sbaf6DtoryzYUyoK2s2HW-FMmVI6l0KQKwivfPnHoKYO1NtfpeVMgaeCwDWDmdIF3qE9iAoYdo-tde2m6oatoQWIteB5l8W7cbsaVPysRbLpVzEa3N2YKw7mIBuZj7UQHNHzQWs-NTTYRPs3gI",
            description: "Engineered for the urban athlete.",
            category: "Shoes",
            stockLevel: 5,
            sizes: JSON.stringify(["8", "9", "10", "11", "12"]),
            images: JSON.stringify(["https://lh3.googleusercontent.com/aida-public/AB6AXuBi5DMssAX3z6iHKTNsShUlPxF16zUZeK7C8PYUTF9lPNEr2ViG5MKr87G5mcti9liEeICGUy5oiUyKFsCMB_RxIUsU1uluv-4ng2DWwIJPGebPDT0qMScQOvKb0sbaf6DtoryzYUyoK2s2HW-FMmVI6l0KQKwivfPnHoKYO1NtfpeVMgaeCwDWDmdIF3qE9iAoYdo-tde2m6oatoQWIteB5l8W7cbsaVPysRbLpVzEa3N2YKw7mIBuZj7UQHNHzQWs-NTTYRPs3gI"]),
        },
    ]

    for (const product of products) {
        await prisma.product.create({
            data: product
        })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

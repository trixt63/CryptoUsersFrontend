This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Resources

- Design: https://xd.adobe.com/view/ef972dbf-9fe7-4ccc-922f-ffe9aa1f2467-bac4

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# *Structure Notes:*
- Homepage: `src/modules/home-v2/introduction/`
- Detail CEX: `src/modules/ranking/project-detail/exchanges`
- Thu tu thuc thi cua chuong trinh:
  - Call APIs & khai bao contexts: `src/pages`
  - Sau do `/pages` se import va chay cac module tu `src/modules`
- Ghep APIs:
  - Liet ke API o `services/[..]-api/`:
    - Khai bao kieu trong `data-types.ts`
    - Ham goi API trong `index.ts`
  - Goi APIs trong `pages/`
- Neu dung context: 
  - Dau tien liet ke context. Type cua context se dua vao kieu tra ve cua API (i.e. phai import cac Api vao context)
  - Dung context o dau thi import vao o do (thuong la dung o `modules/`)
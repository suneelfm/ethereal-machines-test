This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## APIs required

1. ### GET `/alarms`
   ```JSON
   [
    {
      "machine": "string", // Machine name. ex: HALO - 01
      "at": "string", // Time of alarm. ex: Sat Aug 24 2024 09:03:00 GMT+0530 (India Standard Time)
      "alarmMessage": "string", // Message of the alarm. ex: Alarm on Machine 1: 501-(XI)-OVERTRAVEL (SOFT 1)
    }
   ]
   ```
2. ### GET `/machines`
   ```JSON
   [
    {
      "machineName": "string", // Machine name. ex: "NIMBUS - 09"
      "mode": "string", // Mode of the machinr. ex: "MEM"
      "program": "string", // Program of the machine. ex: "09001"
      "toolCount": "number", // No. of tools in machine. ex: 1
      "partsCount": "number", // No. of parts loaded. ex: 1205
      "partsCompleted": "number", // No. of parts complted. ex: 2
      "partGoal": "number", // No. of parts to be completed in given time. ex: 0
      "spindle": "number", // No. of spindles in machine. ex: 7999
      "statusLogs": [
        {
          "status": "string", // Status of the machine for the time. ex: "active"
          "from": "string", // The time of when the machine went to the status. ex: "Thu Aug 22 2024 01:03:00 GMT+0530 (India Standard Time)"
          "to": "string", // The time of till the machine be in the status. ex: "Thu Aug 22 2024 05:03:00 GMT+0530 (India Standard Time)"
        },
      ],
    },
   ]
   ```

## The hosted application URL
https://ethereal-machines-test.vercel.app/

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

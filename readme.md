

## Installation  
**-  Set the following variables:**  
NEXT_PUBLIC_APP_URL=  
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in  
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up  
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard  
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard  
NEXT_PUBLIC_CRISP_CHAT_ID=  
CLERK_SECRET_KEY=  
OPENAI_API_KEY=  
REPLICATE_API_KEY=  
DATABASE_URL=  
STRIPE_API_KEY=  
STRIPE_WEBHOOK_SECRET=  
**-  Set the db provider:**  
In the datasource at ./prisma/schema.prisma, set the db provider.  
**-  (Development) Run the following commands:**  
npm install  
npx prisma migrate dev  
npx prisma generate  
npm run dev  


import  {Stripe} from "stripe";


 const stripe=new Stripe(process.env.STRIPE_API_KEY!,{
    typescript:true,
    apiVersion:"2024-11-20.acacia"
}) 

export { stripe };
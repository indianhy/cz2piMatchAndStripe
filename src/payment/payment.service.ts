import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {

    constructor(@InjectStripe() private stripe:Stripe){}

    async getStripe(){
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: 1000,
            currency: 'inr',
            payment_method_types: ['card'], 
            receipt_email: 'jenny.yadav@example.com',
          });
 
          console.log(paymentIntent.client_secret)

          return paymentIntent
    }

    // app.post(
    //     "/pay",
    //     async (req: express.Request, res: express.Response): Promise<void> =>
        
    async pay(req,res){
          const {
            paymentMethodId,
            paymentIntentId,
            items,
            currency,
            useStripeSdk
          }: {
            paymentMethodId: string;
            paymentIntentId: string;
            items: string;
            currency: string;
            useStripeSdk: boolean;
          } = req.body;
      
          const orderAmount: number = 1400 //calculateOrderAmount(items);
      
          try {
            let intent: Stripe.PaymentIntent;
            if (paymentMethodId) {
              // Create new PaymentIntent with a PaymentMethod ID from the client.
              console.log('should not be here')
              const params: Stripe.PaymentIntentCreateParams = {
                amount: orderAmount,
                confirm: true,
                confirmation_method: "manual",
                currency,
                payment_method: paymentMethodId,
                // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
                // to take advantage of new authentication features in mobile SDKs.
                use_stripe_sdk: useStripeSdk
              };
              intent = await this.stripe.paymentIntents.create(params);
              // After create, if the PaymentIntent's status is succeeded, fulfill the order.
            } else if (paymentIntentId) {
              // Confirm the PaymentIntent to finalize payment after handling a required action
              // on the client.
              console.log('creating intent')
              intent = await this.stripe.paymentIntents.confirm(paymentIntentId);
              // After confirm, if the PaymentIntent's status is succeeded, fulfill the order.
              console.log('created intent')
            }

            const generateResponse = (
                intent: Stripe.PaymentIntent
              ):
                | { clientSecret: string; requiresAction: boolean }
                | { clientSecret: string }
                | { error: string } => {
                // Generate a response based on the intent's status
                console.log('generating response',intent.status)
                switch (intent.status) {
                  case "requires_action":
                    // Card requires authentication
                    return {
                      clientSecret: intent.client_secret,
                      requiresAction: true
                    };
                  case "requires_payment_method":
                    // Card was not properly authenticated, suggest a new payment method
                    return {
                      error: "Your card was denied, please provide a new payment method"
                    };
                  case "succeeded":
                    // Payment is complete, authentication not required
                    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds).
                    console.log("💰 Payment received!");
                    return { clientSecret: intent.client_secret };
                }
              };
        
              console.log('abracadabra')

            return (generateResponse(intent));
          } catch (e) {
            // Handle "hard declines" e.g. insufficient funds, expired card, etc
            // See https://stripe.com/docs/declines/codes for more.
            return({ error: e.message });
          }
        } 
      
      

}



import { Fonts, FontSizes, } from '../app/Styles';


const _styles = {
  slider: RX.Styles.createViewStyle({
    alignSelf: 'center',
    overflow: 'hidden' // for custom animations
  }),
  titleStyle: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  titleStyle2: RX.Styles.createTextStyle({
    font: Fonts.displayRegular,
    fontSize: 16,
    width: 400,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  label: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: FontSizes.size20,
    color: 'black',

  })
}
const Moralis = require('moralis');
Moralis.initialize("gusFz0f11qYPoyrwXeIBr8OnIwOgkNZxiF8W83KJ");
Moralis.serverURL = 'https://y8zeuawsmxmx.usemoralis.com:2053/server'
import * as UI from '@sproutch/ui';

import {
  useStripe,
} from '@stripe/react-stripe-js';



export const StripeHook = ({
  len,
  isLogin,
  isStackNav
}: {
  len: string;
  isLogin: boolean,
  isStackNav: boolean;
}) => {

  const [isLoading,] = useState(false)

  const stripe = useStripe();

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();
    if (stripe) {

      const now = Date.now().valueOf();
      let user = Moralis.User.current()
      if (user) {
        user.set('paymentId', now)
        user.save()
        await stripe.redirectToCheckout({
          lineItems: [{
            price: 'price_1JYGKYLfVewAaHPMX9P0lWjs', // Replace with the ID of your price
            quantity: 1,
          }],
          mode: 'payment',
          successUrl: `https://culturalspacesbooking.herokuapp.com/pay?selected=${now}`,
          cancelUrl: 'https://culturalspacesbooking.herokuapp.com',
        })
      }
    }
  }
  // Get a reference to a mounted CardElement. Elements knows how
  // to find your CardElement because there can only ever be one of
  // each type of element.

  useEffect(() => {
    if (!isLogin) {
      NavContextStore.navigateToTodoList(undefined, false, true)
    }
  }, [])

  return (
    <RX.View style={{ flex: 1, backgroundColor: '#434040', alignItems: 'center', justifyContent: 'center' }}>

      <UI.Paper elevation={10} style={{ root: { borderRadius: 18, height: isStackNav ? 400 : 700, width: isStackNav ? 500 : 600, } }} >
        <RX.Text style={[_styles.titleStyle, { marginTop: 40 }]}>{'Stripe Payment'}</RX.Text>
        <RX.Text style={_styles.titleStyle2}>{'Seleccione un Metodo de Pago'}</RX.Text>
        {isLoading ? <RX.Text>{'Loading'}</RX.Text> :
          <RX.View style={{ width: 300, marginTop: 20, height: 150, alignSelf: 'center' }}>

            <UI.Button onPress={handleSubmit} style={{ content: [{ marginTop: 20, width: 250, borderRadius: 11, alignSelf: 'center' }], label: _styles.label }
            } elevation={4} variant={"outlined"} label="Comprar 100$ en Csb" />
          </RX.View >


        }
      </UI.Paper>
    </RX.View >


  );

};

import * as RX from 'reactxp'
import { useEffect, useState } from 'react';
import NavContextStore from '../stores/NavContextStore';


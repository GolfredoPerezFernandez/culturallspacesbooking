

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
import * as UI from '@sproutch/ui';


export const RechargeHook = ({
  len,
  isStackNav,
}: {
  len: string;
  isStackNav: boolean;
}) => {


  return (<RX.View style={{ flex: 1, backgroundColor: '#434040', alignItems: 'center', justifyContent: 'center' }}>
    <UI.Paper elevation={10} style={{ root: { borderRadius: 18, height: isStackNav ? 400 : 700, width: isStackNav ? 500 : 600, } }} >
      <RX.Text style={[_styles.titleStyle, { marginTop: 40 }]}>{'Recargar Saldo CSB'}</RX.Text>
      <RX.Text style={_styles.titleStyle2}>{'Seleccione un Metodo de Pago'}</RX.Text>
      <RX.View style={{ alignSelf: 'center', width: 300 }}>
        <UI.Button onPress={() => NavContextStore.navigateToTodoList(undefined, false, false, false, false, false, false, false, false, false, false, false, false, true)
        } style={{ content: [{ marginTop: 30, width: 300, borderRadius: 11, alignSelf: 'center' }], label: _styles.label }
        } elevation={4} variant={"outlined"} label="Pay With Credit Card" />

      </RX.View>
    </UI.Paper>
  </RX.View >


  );

};

import * as RX from 'reactxp'

import NavContextStore from '../stores/NavContextStore';
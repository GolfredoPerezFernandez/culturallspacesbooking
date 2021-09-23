

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
    font: Fonts.displayRegular,
    fontSize: FontSizes.size14,
    color: 'white',
  })
}
import * as UI from '@sproutch/ui';


import { translate } from './translate';
export const PartnerHook = ({
  len,
  isStackNav,
}: {
  len: string;
  isStackNav: boolean;
}) => {



  return (<RX.View style={{ flex: 1, backgroundColor: '#434040', alignItems: 'center', justifyContent: 'center' }}>
    <UI.Paper elevation={10} style={{ root: { borderRadius: 18, width: isStackNav ? 400 : 700, height: isStackNav ? 500 : 600, } }} >
      <RX.Text style={[_styles.titleStyle, { marginTop: 40 }]}>{len === 'en' ? translate.partner.english.title : len === 'es' ? translate.partner.español.title : translate.partner.french.title}</RX.Text>
      <RX.Text style={_styles.titleStyle2}>{len === 'en' ? translate.partner.english.content : len === 'es' ? translate.partner.español.content : translate.partner.french.content}</RX.Text>

    </UI.Paper>
  </RX.View >


  );

};

import * as RX from 'reactxp'

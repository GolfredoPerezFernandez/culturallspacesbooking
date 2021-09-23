

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
    width: 600,
    marginBottom: 10,
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
export const TermsHook = ({
  len
}: {
  len: string;
}) => {



  return (<RX.View style={{ flex: 1, backgroundColor: '#434040', alignItems: 'center', justifyContent: 'center' }}>
    <UI.Paper elevation={10} style={{ root: { borderRadius: 18, width: 700, height: 600, } }} >
      <RX.Text style={[_styles.titleStyle, { marginTop: 40 }]}>{len === 'en' ? translate.Terms.english.item1 : len === 'es' ? translate.Terms.español.item1 : translate.Terms.french.item1}</RX.Text>
      <RX.Text style={_styles.titleStyle2}>{len === 'en' ? translate.Terms.english.item2 : len === 'es' ? translate.Terms.español.item2 : translate.Terms.french.item2}</RX.Text>
      <RX.Text style={_styles.titleStyle2}>{len === 'en' ? translate.Terms.english.item4 : len === 'es' ? translate.Terms.español.item4 : translate.Terms.french.item4}</RX.Text>
      <RX.Text style={_styles.titleStyle2}>{len === 'en' ? translate.Terms.english.item3 : len === 'es' ? translate.Terms.español.item3 : translate.Terms.french.item3}</RX.Text>

    </UI.Paper>
  </RX.View >


  );

};

import * as RX from 'reactxp'

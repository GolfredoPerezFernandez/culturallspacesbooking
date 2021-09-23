

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
    textAlign: 'left',
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

export const RoadHook = ({
  len,
  isStackNav,
}: {
  isStackNav: boolean;
  len: string;
}) => {



  return (<RX.View style={{ flex: 1, backgroundColor: '#434040', alignItems: 'center', justifyContent: 'center' }}>
    <UI.Paper elevation={10} style={{ root: { borderRadius: 18, width: isStackNav ? 400 : 700, height: isStackNav ? 500 : 600, } }} >
      <RX.Text style={[_styles.titleStyle, { marginTop: 40 }]}>{len === 'en' ? translate.roadMap.english.title : len === 'es' ? translate.roadMap.español.title : translate.roadMap.french.title}</RX.Text>

      <RX.Text style={[_styles.titleStyle2, { width: isStackNav ? 300 : 400 }]}>{len === 'en' ? translate.roadMap.english.content1 : len === 'es' ? translate.roadMap.español.content1 : translate.roadMap.french.content1}</RX.Text>
      <RX.Text style={[_styles.titleStyle2, { marginTop: 10, width: isStackNav ? 300 : 400 }]}>{len === 'en' ? translate.roadMap.english.content2 : len === 'es' ? translate.roadMap.español.content2 : translate.roadMap.french.content2}</RX.Text>
      <RX.Text style={[_styles.titleStyle2, { marginTop: 10, width: isStackNav ? 300 : 400 }]}>{len === 'en' ? translate.roadMap.english.content3 : len === 'es' ? translate.roadMap.español.content2 : translate.roadMap.french.content3}</RX.Text>

    </UI.Paper>
  </RX.View >


  );

};

import * as RX from 'reactxp'



import { Fonts, FontSizes, } from '../app/Styles';

const _styles = {
  slider: RX.Styles.createViewStyle({
    alignSelf: 'center',
    overflow: 'hidden' // for custom animations
  }),
  sliderContentContainer: RX.Styles.createViewStyle({
    alignSelf: 'center'
  }),
  titleStyle55: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center'
  }),
  titleStyle0: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  titleStyle: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center'
  }),
  titleStyle2s: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 32,
    textAlign: 'left',
    color: 'white',
    alignSelf: 'flex-start'
  }),
  titleStyle2s2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 32,
    textAlign: 'left',
    color: '#FF296D',
    alignSelf: 'flex-start'
  }),
  titleStyle2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 40,
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center'
  }),
  titleStyle22: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 32,
    textAlign: 'left',
    color: 'white',
    alignSelf: 'center'
  }),
  titleStyle3: RX.Styles.createTextStyle({
    font: Fonts.displayRegular,
    fontSize: 14,
    width: 500,
    textAlign: 'center',
    color: 'white',
    marginBottom: 30,
    alignSelf: 'center'
  }),
  titleStyle4: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 46,
    textAlign: 'left',
    color: 'white',
    alignSelf: 'center'
  }),
  titleStyle33: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 40,
    textAlign: 'left',
    color: 'white',
    alignSelf: 'flex-start'
  }),
  titleStyle33s: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 32,
    textAlign: 'left',
    color: '#FF296D',
    alignSelf: 'flex-start'
  }),
  buttomStyle: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  contentStyle: RX.Styles.createTextStyle({
    font: Fonts.displayRegular,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  contentStyle2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  contentStyle3: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  label: RX.Styles.createTextStyle({
    font: Fonts.displayRegular,
    fontSize: FontSizes.size14,
    color: 'white',
  })
}

interface Entries {
  img: string;
  imgText: string;
  title: string;
  content: string;
}

import ImageSource from 'modules/images';

const { Carousel } = require('reactxp-carousel')




interface Entries {
  img: string;
  imgText: string;
  title: string;
  content: string;
}

export const HomeHook = ({
  entries,
  isStackNav,
  width,
  len,
}: {
  entries: Entries[];
  width: number;
  isStackNav: boolean;
  len: string;
}) => {

  useEffect(() => {
    console.log("storage " + JSON.stringify(RX.Storage.getItem('pay')))
  }, [])
  return (<RX.Image resizeMode={'cover'} resizeMethod={'auto'} style={{ flex: 1, backgroundColor: '#01012A' }} source={ImageSource.background}>

    <RX.View style={{ overflow: 'hidden', flex: 1, height: 700, width: isStackNav ? 350 : 500, alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

      <Carousel
        loop={true}
        showsHorizontalScrollIndicator={true}
        autoplay={true}
        data={entries}
        renderItem={({ item, index }: { item: Entries, index: number }) => {
          return (<RX.View style={{ overflow: 'hidden', alignSelf: 'center', marginTop: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <RX.Image resizeMethod={'auto'} resizeMode={'cover'} style={{ width: 100, marginBottom: 15, height: 100 }} source={ImageSource.logo2}></RX.Image>
            <RX.Text style={[_styles.titleStyle, { width: isStackNav ? 350 : 400 }]}>{item.title}</RX.Text>
          </RX.View>);
        }}
        sliderWidth={width}
        itemWidth={width}
        containerCustomStyle={[_styles.slider,]}
        contentContainerCustomStyle={[_styles.sliderContentContainer]}
        autoplayInterval={5000}
        layout={'default'}
      />

    </RX.View>
  </RX.Image>

  );
};

import * as RX from 'reactxp'
import { useEffect } from 'react';


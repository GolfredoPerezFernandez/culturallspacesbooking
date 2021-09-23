import { Fonts, FontSizes, Styles } from '../app/Styles';

const _styles = {
  container: RX.Styles.createViewStyle({
    flex: 1,
    alignSelf: 'stretch',
    padding: 16,
    marginHorizontal: 50
  }),
  editTodoItem: RX.Styles.createTextInputStyle({
    margin: 8,
    height: 41,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
  }),
  editTodoItem2: RX.Styles.createTextInputStyle({
    margin: 8,
    height: 82,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
  }),
  Text: RX.Styles.createTextStyle({
    fontSize: 24,
    font: Fonts.displayBold,
    color: 'black',
  }),
  Text3: RX.Styles.createTextStyle({
    fontSize: 16,
    font: Fonts.displayBold,
    color: 'gray',
  }),
  Text2: RX.Styles.createTextStyle({
    fontSize: 18,
    font: Fonts.displayBold,
    color: 'black',
  }),
  buttonContainer: RX.Styles.createViewStyle({
    margin: 8,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }),
  buttomStyle: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  buttomStyle3: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  buttomStyle2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center'
  }),
  text: RX.Styles.createTextStyle({
    flex: -1,
    fontSize: FontSizes.size16,
    font: Fonts.displayBold,
    color: 'black',
    margin: 8,
  }),
  label: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 14,
    color: 'black',
  })
};
import * as RX from 'reactxp';
import { useState } from 'react';

const Moralis = require('moralis');
Moralis.initialize("gusFz0f11qYPoyrwXeIBr8OnIwOgkNZxiF8W83KJ");
Moralis.serverURL = 'https://y8zeuawsmxmx.usemoralis.com:2053/server'

const { WidgetLoader, Widget } = require('react-cloudinary-upload-widget')

import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import * as UI from '@sproutch/ui';
import NavContextStore from '../stores/NavContextStore';
interface userMoralis {
  username: string;
  email: string;
  createdAt: string;
  sessionToken: string;
  emailVerified: boolean;
  userId: number;
  updatedAt: string;
  avatar: string;
  objectId: string;
}

import { translate } from './translate';
export const CreateTodoHook = ({
  todoName,
  _onChangeText,
  fileExtension,
  user,
  len,

}: {
  todoName: string;
  _onChangeText: any;
  fileExtension: string;
  user: userMoralis;
  len: string;
}) => {

  var [title, setTitle] = useState('')
  var [content, setContent] = useState('')
  var [price, setPrice] = useState(0)
  var [url, setUrl] = useState('')
  var [type, setType] = useState('')

  var [forSale, setForSale] = useState(false)
  const [cargando,] = useState(false)

  const onCreate = async (e: RX.Types.SyntheticEvent) => {

    e.stopPropagation();
    const Item = Moralis.Object.extend("Item")
    const item = new Item()
    item.set("price", price)
    item.set("type", type)
    item.set("uri", url)
    item.set("name", title)
    item.set("description", content)
    item.set("owner", user.username)
    item.set("ownerEmail", user.email)
    item.set("ownerId", user.userId)
    item.set("forSale", forSale)
    await item.save()
      .then((item: any) => {
        // Execute any logic that should take place after the object is saved.

        NavContextStore.navigateToTodoList()
        console.log('New object created with objectId: ' + item.id);
      }, (error: any) => {
        // Execute any logic that should take place if the save fails.
        // error is a Moralis.Error with an error code and message.
        console.log('Failed to create new object, with error code: ' + error.message);
      });

  };
  const success2 = async (res: any) => {
    setType(res.info.resource_type)
    setUrl(res.info.url)
    setForSale(true)

  };
  const success = async (res: any) => {
    setType(res.info.resource_type)
    setUrl(res.info.url)
    setForSale(false)
  };

  return (<RX.View useSafeInsets={true} style={[_styles.container, Styles.statusBarTopMargin]}>
    <RX.Text style={[_styles.Text, { marginBottom: 10 }]} >
      {len === 'en' ? translate.create.english.title : len === 'es' ? translate.create.español.title : translate.create.french.title}
    </RX.Text>
    <RX.Text style={[_styles.Text2, { marginBottom: 10 }]} >
      {len === 'en' ? translate.create.english.title2 : len === 'es' ? translate.create.español.title2 : translate.create.french.title2}
    </RX.Text>

    <RX.Text style={[_styles.Text2,]} >
      {len === 'en' ? translate.create.english.name : len === 'es' ? translate.create.español.name : translate.create.french.name}
    </RX.Text>
    <RX.TextInput
      style={_styles.editTodoItem}
      value={title}

      placeholder={'Item Name'}
      onChangeText={setTitle}
      accessibilityId={'EditTodoPanelTextInput'}
    />


    <RX.Text style={[_styles.Text2, { marginTop: 10 }]} >
      {len === 'en' ? translate.create.english.description : len === 'es' ? translate.create.español.description : translate.create.french.description}
    </RX.Text>
    <RX.TextInput
      multiline={true}
      style={_styles.editTodoItem2}
      value={content}
      placeholder={'Provide a detailed description of your item'}
      onChangeText={setContent}
      accessibilityId={'EditTodoPanelTextInput'}
    />

    <RX.Text style={[_styles.Text2, { marginTop: 10 }]} >
      {len === 'en' ? translate.create.english.forsale : len === 'es' ? translate.create.español.forsale : translate.create.french.forsale}
    </RX.Text>
    <RX.View style={_styles.buttonContainer}>
      {cargando ? <UI.Spinner color={'black'} /> :
        <RX.View style={{ height: 50, width: 200, }}>
          <WidgetLoader />

          <Widget
            sources={['local']}
            resourceType={'auto'}
            cloudName={'dwuk3500t'}

            uploadPreset={'u0zuz2rf'} // check that an upload preset exists and check mode is signed or unisgned
            buttonText={len === 'en' ? translate.create.english.buttom : len === 'es' ? translate.create.español.buttom : translate.create.french.buttom}
            style={{
              color: 'white',
              border: 'none',
              width: '200px',
              backgroundColor: 'red',
              borderRadius: '4px',
              height: '50px'
            }}
            folder={'my_folder'}
            cropping={false}

            onSuccess={(res: any) => success(res)}
            onFailure={() => console.log('fallo')}
            logging={false}
            customPublicId={'sample'}
            eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'}
            use_filename={false}
            apiKey={'771521555115613'}
            accepts={'application/json'}
            contentType={'application/json'}
            withCredentials={true}
            unique_filename={true}
          />
        </RX.View>
      }
      <RX.View style={{ width: 20 }}></RX.View>
      {cargando ? <UI.Spinner color={'black'} /> :
        <RX.View style={{ height: 50, width: 200 }}>
          <WidgetLoader />

          <Widget
            sources={['local']}
            resourceType={'auto'}
            cloudName={'dwuk3500t'}

            uploadPreset={'u0zuz2rf'} // check that an upload preset exists and check mode is signed or unisgned
            buttonText={len === 'en' ? translate.create.english.buttom2 : len === 'es' ? translate.create.español.buttom2 : translate.create.french.buttom2}
            style={{
              color: 'white',
              border: 'none',
              width: '200px',
              backgroundColor: 'green',
              borderRadius: '4px',
              height: '50px'
            }}
            folder={'my_folder'}
            cropping={false}

            onSuccess={(res: any) => success2(res)}
            onFailure={() => console.log('fallo')}
            logging={false}
            customPublicId={'sample'}
            eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'}
            use_filename={false}
            apiKey={'771521555115613'}
            accepts={'application/json'}
            contentType={'application/json'}
            withCredentials={true}
            unique_filename={true}
          />
        </RX.View>
      }
      {url === '' ? null :
        <RX.Text style={[_styles.Text2, { marginLeft: 30, marginTop: 10 }]} >
          {'File Uploaded'}
        </RX.Text>}
    </RX.View>
    {forSale === true ? <RX.View>
      <RX.Text style={[_styles.Text2,]} >
        {len === 'en' ? translate.create.english.price : len === 'es' ? translate.create.español.price : translate.create.french.price}
      </RX.Text>
      <RX.TextInput
        style={_styles.editTodoItem}
        value={price.toString()}

        placeholder={'Price in CSB'}
        onChangeText={(res) => setPrice(parseFloat(res))}
        accessibilityId={'EditTodoPanelTextInput'}
      />
    </RX.View> : null}
    <UI.Button onPress={onCreate} iconSlot={iconStyle => (
      <AiOutlinePlus color={'#FF296D'} style={{ marginTop: 0, marginRight: 5, width: 16, height: 16 }} />
    )} style={{ content: [{ marginTop: 20, width: 160, borderRadius: 11, }], label: _styles.label }
    } elevation={4} variant={"outlined"} label="Create Item" />

  </RX.View>)

}
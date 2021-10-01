/*
* DeepLinkConverter.tsx
* Copyright: Microsoft 2018
*
* Converts between app (deep-link) URLs and navigation contexts.
*/

import * as assert from 'assert';

import * as RX from 'reactxp';
import * as _ from 'lodash';

import NavActions from '../app/NavActions';
import * as NavModels from '../models/NavModels';

import AppConfig from './AppConfig';
import CurrentUserStore from '../stores/CurrentUserStore';

const Moralis = require('moralis');
Moralis.initialize("gusFz0f11qYPoyrwXeIBr8OnIwOgkNZxiF8W83KJ");
Moralis.serverURL = 'https://y8zeuawsmxmx.usemoralis.com:2053/server'

export default class DeepLinkConverter {
    static getUrlFromContext(context: NavModels.RootNavContext): string {
        let url = AppConfig.getFrontendBaseUrl();

        if (context.isStackNav) {
            const stackContext = context as NavModels.StackRootNavContext;
            const topViewContext = stackContext.stack[stackContext.stack.length - 1];

            if (topViewContext instanceof NavModels.TodoListViewNavContext) {
                url += '/seccion';
                return url;
            } else if (topViewContext instanceof NavModels.ViewTodoViewNavContext) {
                url += '/seccion?selected=' + encodeURIComponent(topViewContext.todoId);
                return url;
            } else if (topViewContext instanceof NavModels.NewTodoViewNavContext) {
                url += '/seccion?selected=new';
                return url;
            } else if (topViewContext instanceof NavModels.HomeViewNavContext) {
                url += '/';
                return url;
            } else if (topViewContext instanceof NavModels.StripeViewNavContext) {
                url += '/stripe';
                return url;
            } else if (topViewContext instanceof NavModels.AboutViewNavContext) {
                url += '/about';
                return url;
            }  else if (topViewContext instanceof NavModels.RoadViewNavContext) {
                url += '/road';
                return url;
            }  else if (topViewContext instanceof NavModels.PartnerViewNavContext) {
                url += '/partners';
                return url;
            }  else if (topViewContext instanceof NavModels.RechargeViewNavContext) {
                url += '/recharge';
                return url;
            } else if (topViewContext instanceof NavModels.InvolveViewNavContext) {
                url += '/involve';
                return url;
            }else if (topViewContext instanceof NavModels.TermsViewNavContext) {
                url += '/terms';
                return url;
            } else if (topViewContext instanceof NavModels.DocViewNavContext) {
                url += '/docs';
                return url;
            }else if (topViewContext instanceof NavModels.ChatViewNavContext) {
                url += '/chat';
                return url;
            }else if (topViewContext instanceof NavModels.ChatsViewNavContext) {
                url += '/chats';
                return url;
            }
        } else {
            const compositeContext = context as NavModels.CompositeRootNavContext;
            if (compositeContext instanceof NavModels.TodoRootNavContext) {
                url += '/';
                const todoListContext = context as NavModels.TodoRootNavContext;
                if (todoListContext.showNewTodoPanel) {
                    url += 'seccion?selected=new';
                } else if (todoListContext.todoList.selectedTodoId) {
                    url += 'seccion?selected=' + encodeURIComponent(todoListContext.todoList.selectedTodoId);
                }  else if (todoListContext.showAbout) {
                    url += 'about';
                }  else if (todoListContext.showRoad) {
                    url += 'road';
                }  else if (todoListContext.showPartner) {
                    url += 'partners';
                }  else if (todoListContext.showInvolve) {
                    url += 'involve';
                }  else if (todoListContext.showRecharge) {
                    url += 'recharge';
                }else if (todoListContext.showTerms) {
                    url += 'terms';
                } else if (todoListContext.showSwap) {
                    url += 'about';
                }  else if (todoListContext.showStripe) {
                    url += 'stripe';
                }else if (todoListContext.showDocs) {
                    url += 'docs';
                } else if (todoListContext.showChat) {
                    url += 'chat';
                } else if (todoListContext.showChats) {
                    url += 'chats';
                } else if (todoListContext.showHomePanel) {
                    url += '';
                }
                return url;
            
            } else {
                assert.fail('Unimplemented');
            }
        }

        return '';
    }

    static getContextFromUrl(url: string, isStackNav: boolean): NavModels.RootNavContext | undefined {
        const urlObj = new URL(url);
        if (!urlObj) {
            return undefined;
        }

        const pathElements = _.map(_.split(urlObj.pathname, '/'), elem => decodeURIComponent(elem));
        if (pathElements.length < 2) {
            return undefined;
        }

        switch (pathElements[1]) {
            case 'seccion':
                
                let selectedTodoId: string | undefined;
                let showNewPanel = false;
                let showroadMapPanel = false;
                let showAudioNFTPanel = false;
                let showImageNFTPanel = false;
                let showObjectNFT = false;
                let showSwap = false;

                let showInvolve = false;
                let showICO = false;

                const selectedValue = urlObj.searchParams.get('selected');
                
          
                 if (selectedValue === 'new') {
                    showNewPanel = true;
                }  else if (selectedValue==='roadMap') {
                    selectedTodoId=undefined;
                    showroadMapPanel = true;
                }  else if (selectedValue==='audioNFT') {
                    selectedTodoId=undefined;

                    showAudioNFTPanel = true;
                } else if (selectedValue==='objectNFT') {
                    showObjectNFT = false;
                } else if (selectedValue==='involve') {
                    showInvolve = false;
                } else if(selectedValue){

                    selectedTodoId = selectedValue;
                }
                console.log(showInvolve)
                return NavActions.createTodoListContext(isStackNav, selectedTodoId, showNewPanel,showSwap,showroadMapPanel,showAudioNFTPanel,showImageNFTPanel,showObjectNFT,showICO);
        case 'recharge':
                    return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,false,false,false,false,false,true);
  
        case 'docs':
                  return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,false,true);
        case 'chats':
                    return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,false,false,false,false,true);
         case 'chat':
                        return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,false,false,false,true);
         case 'stripe':
             return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,false,false,false,false,false,false,true);
           
          case 'roadMap':
                    return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,true,false,false,false);
        case 'partners':
                    return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,true);
         case 'about':
                        return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,true,false,false,false);
         case 'involve':
                            return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,true,false,false);
           case 'terms':
                                return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,false,false,false,false,true);
            case 'pay':
                const selectedValue3 = urlObj.searchParams.get('selected');
                console.log('seleccion45 '+selectedValue3)
                console.log("pay "+JSON.stringify(RX.Storage.getItem("pay")))
                
                let user = Moralis.User.current()
                console.log("Entro  "  +user.get('paymentId'))
                if(user.get('paymentId')==selectedValue3){
                   const balance= user.get('csbBalance')
                    user.set('csbBalance',100+balance)
                    
                    user.save()
                let username = user.get('username')
                let email = user.get('email')
                let createdAt = user.get('createdAt')
                let sessionToken = user.get('sessionToken')
                let updatedAt = user.get('updatedAt')
                let photo = user.get('avatar')
                let csbBalance = user.get('csbBalance')
                let objId = user.get('userId')

                    console.log("Entro Exito ")
                    CurrentUserStore.setUser(username, email, createdAt, sessionToken, updatedAt, photo, csbBalance, objId)

                   return NavActions.createTodoListContext(isStackNav, undefined, false,true);
                }
               return NavActions.createTodoListContext(isStackNav, undefined, false,true);
         default:
                return NavActions.createTodoListContext(isStackNav, undefined, false,true);
        }
    }
}

/*
* NavActions.tsx
* Copyright: Microsoft 2018
*
* Constructs navigation contexts.
*/

import * as NavModels from '../models/NavModels';

export default class NavActions {
    static createTodoListContext(useStackNav: boolean, selectedTodoId?: string, showNewTodoPanel = false,showHomePanel=false, showSwap=false,showAbout=false,showRoad=false,showInvolve=false,showPartner=false,showDocs =false,showTerms =false,showChat =false,showChats =false,showRecharge =false,showStripe =false) {
        if (useStackNav) {
            const navContext = new NavModels.StackRootNavContext();
            navContext.stack.push(new NavModels.TodoListViewNavContext(selectedTodoId));
            if (showNewTodoPanel) {
                navContext.stack.push(new NavModels.NewTodoViewNavContext());
            } else if (selectedTodoId !== undefined) {
                navContext.stack.push(new NavModels.ViewTodoViewNavContext(selectedTodoId));
            } else if (showHomePanel) {
                navContext.stack.push(new NavModels.HomeViewNavContext());
            } else if (showAbout) {
                navContext.stack.push(new NavModels.AboutViewNavContext());
            }else if (showRoad) {
                navContext.stack.push(new NavModels.RoadViewNavContext());
            }else if (showInvolve) {
                navContext.stack.push(new NavModels.InvolveViewNavContext());
            }else if (showPartner) {
                navContext.stack.push(new NavModels.PartnerViewNavContext());
            } else if (showSwap) {
                navContext.stack.push(new NavModels.SwapViewNavContext());
            } else if (showDocs) {
                navContext.stack.push(new NavModels.DocViewNavContext());
            } else if (showTerms) {
                navContext.stack.push(new NavModels.TermsViewNavContext());
            } else if (showChat) {
                navContext.stack.push(new NavModels.ChatViewNavContext());
            } else if (showChats) {
                navContext.stack.push(new NavModels.ChatsViewNavContext());
            } else if (showRecharge) {
                navContext.stack.push(new NavModels.RechargeViewNavContext());
            } else if (showStripe) {
                navContext.stack.push(new NavModels.StripeViewNavContext());
            }else {
                
                navContext.stack.push(new NavModels.HomeViewNavContext());
            }
            return navContext;
        } else {
            return new NavModels.TodoRootNavContext(selectedTodoId, showNewTodoPanel,showHomePanel,showSwap,showAbout,showRoad,showInvolve,showPartner,showDocs,showTerms,showChat,showChats,showRecharge,showStripe);
        }
    }
}

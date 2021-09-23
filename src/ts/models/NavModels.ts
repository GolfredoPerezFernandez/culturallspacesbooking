/**
* NavModels.ts
* Copyright: Microsoft 2018
*
* Interface and enumeration definitions used for app navigation.
* A "navigation context" describes a location within the app and
* any associated state that may be expressed within a deep link.
*
* A "view nav context" describes the state of a view.
*
* A "root nav context" describes the nav context for the app's
* root view - the top of the visual hierarchy. Depending on the
* screen size, the root nav context may be stack-based (consisting
* of a stack of individual panels) or composite (in which multiple
* views are displayed side by side).
*/

import * as _ from 'lodash';

export enum NavViewId {
    TodoComposite = 1,
    TodoList,
    NewTodo,
    ViewTodo,
    Home,
    About,
    Road,
    Involve,
    Docs,
    Partner,
    Swap,
    Terms,
    Chat,
    Recharge,
    Chats,
    Stripe
}

// ----------------------------------------
// Root nav contexts
// ----------------------------------------
export abstract class RootNavContext {
    constructor(public isStackNav: boolean) {
    }

    abstract clone(): RootNavContext;
}

export abstract class CompositeRootNavContext extends RootNavContext {
    constructor(public viewId: NavViewId) {
        super(false);
    }
}

export class StackRootNavContext extends RootNavContext {
    stack: ViewNavContext[];

    constructor() {
        super(true);
        this.stack = [];
    }

    clone(): StackRootNavContext {
        const clone = new StackRootNavContext();
        _.each(this.stack, navContext => {
            clone.stack.push(navContext.clone());
        });
        return clone;
    }
}

export class TodoRootNavContext extends CompositeRootNavContext {
    todoList: TodoListViewNavContext;

    constructor(selectedTodoId?: string, public showNewTodoPanel = false,public showHomePanel = false, public showSwap = false,public showAbout = false, public showRoad = false,public showInvolve = false,public showPartner = false ,public showDocs = false,public showTerms = false,public showChat = false ,public showChats = false ,public showRecharge = false ,public showStripe = false  ) {
        super(NavViewId.TodoComposite);
        this.todoList = new TodoListViewNavContext(selectedTodoId);
    }

    clone(): TodoRootNavContext {
        return new TodoRootNavContext(this.todoList.selectedTodoId, this.showNewTodoPanel,this.showHomePanel,this.showSwap,this.showAbout,this.showRoad,this.showInvolve,this.showPartner,this.showDocs,this.showTerms,this.showChat,this.showChats,this.showRecharge,this.showStripe);
    }
}

// ----------------------------------------
// View nav contexts
// ----------------------------------------

export abstract class ViewNavContext {
    constructor(public viewId: NavViewId) {
    }

    abstract clone(): ViewNavContext;
}

export class TodoListViewNavContext extends ViewNavContext {
    constructor(public selectedTodoId?: string) {
        super(NavViewId.TodoList);
    }

    clone(): TodoListViewNavContext {
        return new TodoListViewNavContext(this.selectedTodoId);
    }
}

export class NewTodoViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.NewTodo);
    }

    clone(): NewTodoViewNavContext {
        return new NewTodoViewNavContext();
    }
}

export class ViewTodoViewNavContext extends ViewNavContext {
    constructor(public todoId: string) {
        super(NavViewId.ViewTodo);
    }

    clone(): ViewTodoViewNavContext {
        return new ViewTodoViewNavContext(this.todoId);
    }
}

export class HomeViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Home);
    }

    clone(): HomeViewNavContext {
        return new HomeViewNavContext();
    }
}


export class AboutViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.About);
    }

    clone(): AboutViewNavContext {
        return new AboutViewNavContext();
    }
}



export class RoadViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Road);
    }

    clone(): RoadViewNavContext {
        return new RoadViewNavContext();
    }
}


export class PartnerViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Partner);
    }

    clone(): PartnerViewNavContext {
        return new PartnerViewNavContext();
    }
}
export class InvolveViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Involve);
    }

    clone(): InvolveViewNavContext {
        return new InvolveViewNavContext();
    }
}

export class SwapViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Swap);
    }

    clone(): SwapViewNavContext {
        return new SwapViewNavContext();
    }
}


export class TermsViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Terms);
    }

    clone(): TermsViewNavContext {
        return new TermsViewNavContext();
    }
}
export class DocViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Docs);
    }

    clone(): DocViewNavContext {
        return new DocViewNavContext();
    }
}


export class ChatViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Chat);
    }

    clone(): ChatViewNavContext {
        return new ChatViewNavContext();
    }
}

export class ChatsViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Chats);
    }

    clone(): ChatsViewNavContext {
        return new ChatsViewNavContext();
    }
}

export class RechargeViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Recharge);
    }

    clone(): RechargeViewNavContext {
        return new RechargeViewNavContext();
    }
}
export class StripeViewNavContext extends ViewNavContext {
    constructor() {
        super(NavViewId.Stripe);
    }

    clone(): StripeViewNavContext {
        return new StripeViewNavContext();
    }
}
export interface IChooseNoteColorProps {
    eachColor:string;
    stateColor:string;
    handler(args:string):void;
}

export interface ILoginPlsProps {
    text: string;
    loading: boolean;
}

export interface IOauthBtnProps {
    btnName: string,
    btnText: string,
    action: string
}

export interface ISaveDeleteBtnProps {
    type: string,
    handler(): void
}

export interface IVisibilityBtnProps {
    visible: boolean,
    handler(args:boolean): void,
}

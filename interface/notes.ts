export interface INote{
    color: string;
    id: string;
    note: string;
    shared_by?: string;
    user_img?: string;
}
export interface IPublicNote{
    color: string;
    id: string;
    note: string;
    shared_by: string;
    user_img: string;
}

export interface IDashNotes {
    note : INote;
    db_user : string;
}

export interface IPublicNotes {
    note : IPublicNote;
}
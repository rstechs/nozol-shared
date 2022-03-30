interface INoteContent {
    text: string;
    mentionedIds: string[]
}

interface ICreator {
    id: string,
    name: string
}

interface INote {
    id: number,
    content: INoteContent,
    createdBy: ICreator,
    createdAt: Date,
}

export interface INotes extends Array<INote> { }

export interface Notable {

    getAttrMaxId(attr: string): number;

    getNextAttrId(attr: string): number;

}
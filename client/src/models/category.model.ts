import ICommonModel from "./common.model";

export interface ICategory extends ICommonModel {
    title: string;
    students: number;
}

export interface IGroupedCategories extends ICommonModel {
    title: string;
    sub_categories: ICategory[]
}
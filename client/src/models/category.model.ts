import CommonModel from "./common.model";

export interface Category extends CommonModel {
    title: string;
    students: number;
}

export interface GroupedCategories extends CommonModel {
    title: string;
    sub_categories: Category[]
}
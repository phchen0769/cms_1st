export interface ListInt{
    userId:number,
    id:number,
    title:string,
    introduce:string
}

export interface selectData{
    title:string,
    introduce:string,
    page:number,    //页码
    count:number,   //总条数
    pageSize:number //默认一页显示几条
}

export class InitData{
    selectData:selectData={
        title:'',
        introduce:'',
        page:1,
        count:0,
        pageSize:10
    };

    // 展示的内容数据
    list:ListInt[]=[];
}
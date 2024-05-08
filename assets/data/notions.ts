import dayjs from 'dayjs';

const now = dayjs();


const notions = [
    {
        id:0,
        time:now.format('YYYY-MM-DD HH:mm:ss') ,
        tags:"编程",
        content:"c++内联函数目的是为了减少频繁调用函数造成的内存开销。"
    },
    {
        id:1,
        time:now.format('YYYY-MM-DD HH:mm:ss') ,
        tags:"阅读/曹操传",
        content:"学可以无术，但不可以不博。"
    },
    {
        id:2,
        time:now.format('YYYY-MM-DD HH:mm:ss') ,
        tags:"金句/绝命毒师",
        content:"Things have a way of working themselves out。\n事情总会有解决的办法。"
    },
    {
        id:3,
        time:now.format('YYYY-MM-DD HH:mm:ss') ,
        tags:"金句/绝命毒师",
        content:"I choose not to do it.\n我选择顺其自然。"
    },
    {
        id:4,
        time:now.format('YYYY-MM-DD HH:mm:ss') ,
        tags:"金句/绝命毒师",
        content:"I choose not to do it.\n我选择顺其自然。"
    },
    {
        id:5,
        time:now.format('YYYY-MM-DD HH:mm:ss') ,
        tags:"金句/绝命毒师",
        content:"I choose not to do it.\n我选择顺其自然。"
    },
]

export default notions
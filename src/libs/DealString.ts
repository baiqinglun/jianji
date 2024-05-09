export const removeLine = (str:string):string =>{
    const temp = str.replace(/(\r\n|\\n|\r)/gm,"")
    return temp
}
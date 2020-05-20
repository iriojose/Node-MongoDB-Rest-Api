

//initialize querys parameters
export async function processQuerys(querys:any){
    
    let data:[number,number,number]= [0,50,1];

    if(querys.offset !== null) data[0] = querys.offset;

    if(querys.limit !== null) data[1] = querys.limit;

    if(querys.order !== null) data[2] = querys.order;

    return data;
}


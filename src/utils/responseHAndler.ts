export class ResponseHandler {
    data: any;
    error: any;
    constructor(data: any, error: any = null) {
        this.data = sentize(data);
        this.error = error;
    }
}

export function sentize(data: any) {
    if (!data) return data;
    
   let obj = JSON.parse(JSON.stringify(data));

    if (obj && typeof obj.password) {      
        delete obj.password;
    }

    return obj
}
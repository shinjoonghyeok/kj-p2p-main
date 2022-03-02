import BaseModel from './baseModel'
import CustomerData from '../data/customerData';

export default class CustomerModel extends BaseModel {
    public uid: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public phone: string;
    public country: string;
    public activeYN: string;
    
    constructor(uid: string, email: string, firstName: string, lastName: string, phone: string, country: string, activeYN: string) {
        super();
        this.uid = uid;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.country = country;
        this.activeYN = activeYN;
    
    }


    
    static async insert(uid:string, email:string, firstName:string, lastName:string, phone:string, country:string) {
        return await CustomerData.custoemrInsert(uid, email, firstName, lastName, phone, country);
    }

    async update() {
        return await CustomerData.custoemrUpdate(this.uid, this.firstName, this.lastName, this.phone, this.country, this.activeYN);
    }

    static select(uid: string){
        var promise = CustomerData.custoemrSelect(uid)
        return CustomerModel.selectFromData(promise, CustomerModel);
    }

    protected static applyData(data: any) {
        return new CustomerModel(data.uid, data.email, data.firstName, data.lastName, data.phone, data.country, data.activeYN);
    }


    static async list(searchKey:string, searchValue:string, limit:number, offset:number) {
        return await CustomerData.custoemrList(searchKey, searchValue, limit, offset);
    }

    static async kycApply(uid:string, birthDay:string, address1:string, address2:string, city:string, country:string, certImg1:string, certImg2:string) {
        return await CustomerData.kycApply(uid, birthDay, address1, address2, city, country, certImg1, certImg2);
    }

    async kycApply(birthDay:string, address1:string, address2:string, city:string, country:string, certImg1:string, certImg2:string) {
        return await CustomerData.kycApply(this.uid, birthDay, address1, address2, city, country, certImg1, certImg2);
    }

    static async kycSelect(uid:string) {
        return await CustomerData.kycSelect(uid);
    }

    async kycSelect() {
        return await CustomerData.kycSelect(this.uid);
    }

    
    static async kycList(searchKey:string, searchValue:string, limit:number, offset:number) {
        return await CustomerData.kycList(searchKey, searchValue, limit, offset);
    }

    

    static async referalRateInsert(uid:string, step1:number, step2:number, step3:number, step4:number ){        
        return await CustomerData.referalRateInsert(uid, step1, step2, step3, step4);
    }

    static async referalRateUpdate(uid:string, step1:number, step2:number, step3:number, step4:number ){        
        return await CustomerData.referalRateUpdate(uid, step1, step2, step3, step4);
    }
    
    static async referalRateSelect(uid:string) {
        return await CustomerData.referalRateSelect(uid);
    }
}
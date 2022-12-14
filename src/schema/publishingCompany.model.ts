import {Schema, model} from "mongoose";

interface IPublishingCompany {
    name: string
}
const companySchema = new Schema<IPublishingCompany>({
    name: String
})
const Company = model<IPublishingCompany>('Company', companySchema);

export { Company };
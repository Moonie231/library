"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = require("mongoose");
const companySchema = new mongoose_1.Schema({
    name: String
});
const Company = (0, mongoose_1.model)('Company', companySchema);
exports.Company = Company;
//# sourceMappingURL=publishingCompany.model.js.map
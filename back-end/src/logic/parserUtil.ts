import { IBusinessesResponse } from '../data/dataInterfaces';
import BusinessesModel from '../data/models/businessesModel';
import BusinessModel from '../data/models/businessModel';
import { plainToClass, classToPlain } from 'class-transformer';

class ParserUtil {
  public static async parse(data: JSON): Promise<Object[]> {
    // Parse the JSON into the desired class structure
    const businessesModel = plainToClass(BusinessModel, data);
    const payload = classToPlain(businessesModel);
    // Access the parsed data
    console.log(payload);
    return payload as Object[];
  }
}

export default ParserUtil;

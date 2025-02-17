import { CreatePropertyDTO } from "../../application/dtos/create_property_dto";
import { PropertyService } from "../../application/services/property_service";

export class PropertyController {
  private readonly propertyService: PropertyService;

  constructor(propertyService: PropertyService) {
    this.propertyService = propertyService;
  }

  async createProperty(req: any, res: any) {
    try {
      const dto: CreatePropertyDTO = {
        name: req.body.name,
        description: req.body.description,
        maxGuests: req.body.maxGuests,
        basePricePerNight: req.body.basePricePerNight,
      };

      const property = await this.propertyService.createProperty(dto);
      res.status(201).json({
        message: "Propriedade criada com sucesso.",
        property: {
          id: property.getId(),
          name: property.getName(),
          description: property.getDescription(),
          maxGuests: property.getMaxGuests(),
          basePricePerNight: property.getBasePricePerNight(),
        },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

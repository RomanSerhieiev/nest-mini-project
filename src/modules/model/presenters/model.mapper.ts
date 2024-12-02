import { ModelEntity } from '#entities/model.entity';
import { ModelResDto } from '#modules/model/models/dto/res/model.res.dto';
import { ModelListResDto } from '#modules/model/models/dto/res/model-list.res.dto';

export class ModelMapper {
  public static toResDto(model: ModelEntity): ModelResDto {
    return {
      _id: model._id,
      name: model.name,
      advertisements: [],
    };
  }

  public static toResDtoList(models: ModelEntity[], total: number): ModelListResDto {
    return { models: models.map(this.toResDto), total };
  }
}

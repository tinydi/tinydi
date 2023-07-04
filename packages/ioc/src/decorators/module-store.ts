import { ClassType } from '../interface/common/type';

export interface ModuleStore {
  saveModule(decorator: string, target: ClassType);
}

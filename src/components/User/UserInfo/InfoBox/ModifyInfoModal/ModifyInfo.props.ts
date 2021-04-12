import { ChangeEvent } from 'react';
import { EMajor } from 'lib/enum/majors';

export default interface ModifyInfoProps {
  avatar: string;
  nameState: {
    name: string;
    onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  };

  emailState: {
    email: string;
    onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  };

  descriptionState: {
    description: string;
    onChangeDescription: (e: ChangeEvent<HTMLInputElement>) => void;
  };

  locationState: {
    location: string;
    onChangeLocation: (e: ChangeEvent<HTMLInputElement>) => void;
  };

  blogState: {
    blog: string;
    onChangeBlog: (e: ChangeEvent<HTMLInputElement>) => void;
  };

  positionState: {
    position: string;
    onChangePosition: (e: ChangeEvent<HTMLInputElement>) => void;
  };

  generationState: {
    generation: number;
    onChangeGeneration: (generation: number) => void;
  };

  majorState: {
    major: EMajor;
    onChangeMajor: (major: number) => void;
  };

  onChangeIsModifyModal: () => void;
  requestModifyInfo: () => Promise<void>;
}
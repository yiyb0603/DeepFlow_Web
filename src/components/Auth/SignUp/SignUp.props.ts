import { ChangeEvent } from "react";
import { EMajor } from "lib/enum/majors";
import { IRegisterRequest } from "types/user.types";

export default interface SignUpProps {
  isLoading: boolean;
  request: IRegisterRequest;

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

  requestRegister: () => Promise<void>;
};
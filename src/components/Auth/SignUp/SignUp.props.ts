import { ChangeEvent } from "react";
import { EMajor } from "lib/enum/majors";
import { IGithubUser } from "types/user.types";

export default interface SignUpProps {
  isLoading: boolean;
  githubInfo: IGithubUser;

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
import { customAxios } from "lib/CustomAxios";
import { IGithubCodeDto } from "./auth.dto";
import { IGithubResponse, ILoginResponse, IRegisterRequest } from "types/user.types";

export const getGithubInfo = async (githubCodeDto: IGithubCodeDto): Promise<IGithubResponse> => {
  const url: string = '/user/github-info';
  const { data } = await customAxios.post(url, githubCodeDto);
  return data;
}

export const handleRegister = async (registerDto: IRegisterRequest): Promise<ILoginResponse> => {
  const url: string = '/user/sign-up';
  const { data } = await customAxios.post(url, registerDto);
  return data;
}
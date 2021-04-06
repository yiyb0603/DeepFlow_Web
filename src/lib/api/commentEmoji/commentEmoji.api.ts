import { customAxios } from 'lib/CustomAxios';
import { IResponse } from 'types/Response';
import { ICommentEmojiDto } from './commentEmoji.dto';

export const createCommentEmoji = async (commentEmojiDto: ICommentEmojiDto): Promise<IResponse> => {
  const url: string = `/comment-emoji`;
  const { data } = await customAxios.post(url, commentEmojiDto);
  return data;
}

export const deleteCommentEmoji = async (emojiIdx: number): Promise<IResponse> => {
  const url: string = `/comment-emoji/${emojiIdx}`;
  const { data } = await customAxios.delete(url);
  return data;
}
import Logo from 'assets/icons/TextBlackLogo.svg';

export const APP_NAME = 'DeepFlow' as const;
export const APP_DESCRIPTION = '대구소프트웨어고등학교 학생들을 위한 StackOverflow 서비스 입니다.' as const;
export const APP_LOGO: string = Logo;

// 한페이지에 몇개의 글 목록을 보여줄것인지.
export const CHUNK_POST_COUNT = 6 as const;

// 이전 / 다음 버튼 사이에 몇개의 페이지를 보여줄것인지.
export const CHUNK_PAGE_COUNT = 5 as const;
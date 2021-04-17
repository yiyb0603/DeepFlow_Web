import VelogBanner from 'assets/images/banners/Velog.png';
import DGSWCertificaion from 'assets/images/banners/DGSW_Certification.png';
import StackOverflow from 'assets/images/banners/StackOverflow.png';
import Corona from 'assets/images/banners/Corona.jpg';

export interface IBanner {
  image: string;
  link: string;
}

export const banners: IBanner[] = [
  {
    image: VelogBanner,
    link: 'https://velog.io',
  },

  {
    image: StackOverflow,
    link: 'https://stackoverflow.com',
  },

  {
    image: Corona,
    link: 'http://ncov.mohw.go.kr',
  },

  {
    image: DGSWCertificaion,
    link: 'http://www.dgsw.hs.kr',
  },
];
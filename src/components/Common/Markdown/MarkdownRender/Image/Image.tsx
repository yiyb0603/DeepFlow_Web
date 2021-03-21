import { CSSProperties } from 'react';

const Image = (props: any): JSX.Element => {
  const imageStyle: CSSProperties = {
    display: 'block',
    margin: '10px 0',
    width: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
  }

  return (
    <img {...props} alt='images' style ={imageStyle} />
  );
};

export default Image;

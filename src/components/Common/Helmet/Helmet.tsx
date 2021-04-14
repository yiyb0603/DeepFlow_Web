import { Helmet as ReactHelmet } from 'react-helmet';
import { APP_DESCRIPTION, APP_LOGO, APP_NAME } from 'constants/util';

interface HelmetProps {
  title?: string;
  description?: string;
  favicon?: string;
}

const Helmet = ({
  title = APP_NAME,
  description = APP_DESCRIPTION,
  favicon = APP_LOGO,
}: HelmetProps): JSX.Element => {
  return (
    <ReactHelmet>
      <title>{`${title.concat(title === APP_NAME ? '' : ` - ${APP_NAME}`)}`}</title>
      <meta name='description' content={description} />
			<meta property='og:title' content={title} />
			<meta property='og:image' content={favicon} />
			<meta property='og:site_name' content={APP_NAME} />
			<meta property='og:description' content={description} />

			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:image' content={favicon} />
			<meta name='twitter:card' content='summary' />
    </ReactHelmet>
  );
}

export default Helmet;
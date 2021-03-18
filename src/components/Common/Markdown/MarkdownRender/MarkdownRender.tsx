import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import BlockQuote from './BlockQuote';
import CodeBlock from './CodeBlock';
import Image from './Image';
import { ClassNamesFn } from 'classnames/types';

const style = require('./MarkdownRender.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface MarkdownRenderProps {
	contents: string;
}

const MarkdownRender = ({ contents }: MarkdownRenderProps): JSX.Element => {
	return (
		<ReactMarkdown
			className={cx('MarkdownRender')}
			source={contents}
			escapeHtml={false}
			renderers={{
				code: CodeBlock,
				blockquote: BlockQuote,
				image: Image,
			}}
		/>
	);
};

export default MarkdownRender;

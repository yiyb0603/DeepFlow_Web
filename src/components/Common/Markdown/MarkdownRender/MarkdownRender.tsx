import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import gfm from 'remark-gfm';
import BlockQuote from './BlockQuote';
import CodeBlock from './CodeBlock';
import Image from './Image';

const style = require('./MarkdownRender.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface MarkdownRenderProps {
	contents: string;
}

const MarkdownRender = ({
	contents,
}: MarkdownRenderProps): JSX.Element => {
	return (
		<ReactMarkdown
			className={cx('MarkdownRender')}
			source={contents}
			plugins={[gfm]}
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

import { CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import gfm from 'remark-gfm';
import BlockQuote from './BlockQuote';
import CodeBlock from './CodeBlock';
import Image from './Image';

const style = require('./MarkdownRender.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface MarkdownRenderProps {
	contents: string;
	style?: CSSProperties;
}

const MarkdownRender = ({
	contents,
	style,
}: MarkdownRenderProps): JSX.Element => {
	return (
		<div
			className={cx('MarkdownRender')}
			style={style}
		>
			<ReactMarkdown
				className={cx('MarkdownRender-Render')}
				source={contents}
				plugins={[gfm]}
				escapeHtml={false}
				renderers={{
					code: CodeBlock,
					blockquote: BlockQuote,
					image: Image,
				}}
			/>
		</div>
	);
};

export default MarkdownRender;

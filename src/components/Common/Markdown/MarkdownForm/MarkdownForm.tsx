import { ChangeEvent, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import MdEditor from 'react-markdown-editor-lite';
import 'highlight.js/styles/rainbow.css';
import 'react-markdown-editor-lite/lib/index.css';

const style = require('./MarkdownForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface MarkdownFormProps {
	title: string;
	contents: string;
	onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const mdParser: MarkdownIt = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	highlight: (str: string, lang: string) => {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(lang, str).value;
			} catch (error) {
				throw new Error(error);
			}
		}
		return '';
	},
});

const MarkdownForm = ({
	title,
	contents,
	onChangeContents,
}: MarkdownFormProps): JSX.Element => {
	return (
		<div className={cx('MarkdownForm')}>
			<MdEditor
				value={contents}
				onChange={(data, e) => onChangeContents(e!)}
				style={{ height: '75vh' }}
				renderHTML={(text: string) => mdParser.render(text)}
				placeholder="내용을 입력하세요..."
			>
				{title}
			</MdEditor>
		</div>
	);
};

export default memo(MarkdownForm);

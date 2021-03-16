import { memo } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import MdEditor from 'react-markdown-editor-lite';
import 'highlight.js/styles/rainbow.css';
import 'react-markdown-editor-lite/lib/index.css';
import './MarkdownForm.scss';

interface MarkdownFormProps {
	title: string;
	contents: string;
	onChangeContents: (text: string) => void;
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
		<MdEditor
			value={contents}
			onChange={(e) => onChangeContents(e.text)}
			style={{ height: '75vh' }}
			renderHTML={(text: string) => mdParser.render(text)}
			placeholder="내용을 입력하세요..."
		>
			{title}
		</MdEditor>
	);
};

export default memo(MarkdownForm);

import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import imageUpload from 'util/imageUpload';
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
	onChangeContents: (text: string) => void;
	onChangeIsFocus?: () => void;
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
	onChangeIsFocus,
}: MarkdownFormProps): JSX.Element => {
	const handleImageUpload = useCallback((file: File): Promise<string> => {
		return new Promise((resolve) => {
			const reader: FileReader = new FileReader();
			reader.onload = async () => {
				await imageUpload(file)
				.then((response: string) => {
					resolve(response);
				});
			};
			
			reader.readAsDataURL(file);
		});
	}, []);

	return (
		<div className={cx('MarkdownForm')}>
			<MdEditor
				value={contents}
				onChange={({ text }) => onChangeContents(text)}
				style={{ height: '75vh' }}
				renderHTML={(text: string) => mdParser.render(text)}
				placeholder="내용을 입력하세요..."
				onImageUpload={handleImageUpload}
				onFocus={onChangeIsFocus}
				onBlur={onChangeIsFocus}
			>
				{title}
			</MdEditor>
		</div>
	);
};

export default memo(MarkdownForm);

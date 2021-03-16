import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import MdEditor from 'react-markdown-editor-lite';
import 'highlight.js/styles/atom-one-light.css';
import 'react-markdown-editor-lite/lib/index.css';

interface MarkdownFormProps {
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
	contents,
	onChangeContents,
}: MarkdownFormProps): JSX.Element => {
	return (
		<MdEditor
			value={contents}
			onChange={({ text }: { text: string }) => onChangeContents(text)}
			style={{ height: '80vh' }}
			renderHTML={(text: string) => mdParser.render(text)}
			placeholder="내용을 입력하세요..."
		/>
	);
};

export default MarkdownForm;

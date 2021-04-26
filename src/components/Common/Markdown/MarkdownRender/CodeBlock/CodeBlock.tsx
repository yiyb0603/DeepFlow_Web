import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
	language: string;
	value: string;
}

const CodeBlock = ({
	language,
	value,
}: CodeBlockProps): JSX.Element => {
	return (
		<SyntaxHighlighter
			language={language}
			style={dracula}
		>
			{value || ''}
		</SyntaxHighlighter>
	);
};

export default CodeBlock;

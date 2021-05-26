import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import MdEditor from 'react-markdown-editor-lite';
import imageUpload from 'util/imageUpload';
import 'react-markdown-editor-lite/lib/index.css';

const style = require('./MarkdownForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface MarkdownFormProps {
	height?: string;
	maxHeight?: string;
	contents: string;
	onChangeContents: (text: string) => void;
	onChangeIsFocus?: () => void;
}

const MarkdownForm = ({
	height = '75vh',
	maxHeight = '75vh',
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
				name='contents'
				value={contents}
				onChange={({ text }) => onChangeContents(text)}
				style={{ height, maxHeight }}
				syncScrollMode={[]}
				renderHTML={(text: string) => ''}
				placeholder="내용을 입력하세요..."
				onImageUpload={handleImageUpload}
				onFocus={onChangeIsFocus}
				onBlur={onChangeIsFocus}
			/>
		</div>
	);
};

export default memo(MarkdownForm);

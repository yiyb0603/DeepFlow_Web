import { CSSProperties } from 'react';
import { Select } from 'antd';
import { EPost } from 'lib/enum/post';

const { Option } = Select;

interface SelectCategoryProps {
  category?: EPost;
  onChangeCategory?: (category: EPost) => void;
}

const SelectCategory = ({
  category,
  onChangeCategory
}: SelectCategoryProps): JSX.Element => {
  const { QUESTION, POST } = EPost;

  const selectStyle: CSSProperties = {
    width: 120,
  };

  return (
    <Select
      style={selectStyle}
      onChange={onChangeCategory}
      defaultValue={QUESTION}
    >
      <Option value={QUESTION}>질문 글</Option>
      <Option value={POST}>기술 글</Option>
    </Select>
  );
};

export default SelectCategory;

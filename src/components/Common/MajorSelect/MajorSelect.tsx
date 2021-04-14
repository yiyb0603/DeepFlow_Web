import { CSSProperties } from 'react';
import { Select } from 'antd';
import { EMajor } from 'lib/enum/majors';
import { IAuthOption, majors } from 'lib/models/menu/authOption';

const { Option } = Select;

interface MajorSelectProps {
  major: EMajor;
  onChangeMajor: (major: EMajor) => void;
}

const MajorSelect = ({
  major,
  onChangeMajor,
}: MajorSelectProps): JSX.Element => {
  const selectStyle: CSSProperties = {
    width: '45%',
  };

  return (
    <Select
      style={selectStyle}
      value={major}
      onChange={onChangeMajor}
    >
      {
        majors.map(({ text, value }: IAuthOption, idx: number) => (
          <Option key={idx} value={value}>{text}</Option>
        ))
      }
    </Select>
  );
};

export default MajorSelect;

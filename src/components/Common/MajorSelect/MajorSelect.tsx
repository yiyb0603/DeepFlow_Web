import { CSSProperties } from 'react';
import { Select } from 'antd';
import { EMajor } from 'lib/enum/majors';
import { IAuthOption, majors } from 'lib/models/authOption';

const { Option } = Select;

interface MajorSelectProps {
  majorState: {
    major: EMajor;
    onChangeMajor: (major: EMajor) => void;
  }
}

const MajorSelect = ({
  majorState,
}: MajorSelectProps): JSX.Element => {
  const selectStyle: CSSProperties = {
    width: '45%',
  };

  return (
    <Select
      style={selectStyle}
      value={majorState.major}
      onChange={majorState.onChangeMajor}
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
